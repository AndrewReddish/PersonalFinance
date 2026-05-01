#!/usr/bin/env python3
"""Generate PDF from ukraine_ibkr_guide_2026.md using ReportLab with Cyrillic support."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

# ── Register Cyrillic fonts ──────────────────────────────────────────────────
BASE = "/usr/share/fonts/truetype/freefont/"
pdfmetrics.registerFont(TTFont("Free",     BASE + "FreeSans.ttf"))
pdfmetrics.registerFont(TTFont("FreeBold", BASE + "FreeSansBold.ttf"))
pdfmetrics.registerFont(TTFont("FreeIt",   BASE + "FreeSansOblique.ttf"))
pdfmetrics.registerFont(TTFont("FreeMono", BASE + "FreeMono.ttf"))
pdfmetrics.registerFontFamily("Free", normal="Free", bold="FreeBold",
                               italic="FreeIt", boldItalic="FreeBold")

# ── Colour palette ────────────────────────────────────────────────────────────
BLUE      = colors.HexColor("#1A56B0")
DARK_BLUE = colors.HexColor("#0D3472")
LIGHT_BG  = colors.HexColor("#F0F4FA")
ACCENT    = colors.HexColor("#F5A623")
GREEN     = colors.HexColor("#27AE60")
RED       = colors.HexColor("#E74C3C")
GREY_LINE = colors.HexColor("#CCCCCC")
WHITE     = colors.white
BLACK     = colors.HexColor("#1A1A1A")
TABLE_HDR = colors.HexColor("#1A56B0")
TABLE_ALT = colors.HexColor("#EEF3FB")

# ── Styles ───────────────────────────────────────────────────────────────────
def make_styles():
    s = {}

    def ps(name, **kw):
        base = kw.pop("parent", None)
        defaults = dict(fontName="Free", fontSize=10, leading=14,
                        textColor=BLACK, spaceAfter=4, spaceBefore=0,
                        leftIndent=0, rightIndent=0)
        defaults.update(kw)
        s[name] = ParagraphStyle(name, **defaults)

    ps("title",   fontName="FreeBold", fontSize=22, leading=28,
       textColor=WHITE, spaceAfter=6, alignment=TA_CENTER)
    ps("subtitle",fontName="FreeIt",  fontSize=11, leading=16,
       textColor=WHITE, spaceAfter=4, alignment=TA_CENTER)
    ps("note",    fontName="FreeIt",  fontSize=8,  leading=11,
       textColor=colors.HexColor("#888888"), spaceAfter=2)
    ps("toc_title", fontName="FreeBold", fontSize=13, leading=18,
       textColor=DARK_BLUE, spaceAfter=6, spaceBefore=8)
    ps("toc_item",  fontName="Free", fontSize=10, leading=14,
       leftIndent=12, spaceAfter=2)

    ps("h1", fontName="FreeBold", fontSize=15, leading=20,
       textColor=WHITE, spaceAfter=8, spaceBefore=14,
       backColor=BLUE, leftIndent=-12, rightIndent=-12,
       borderPadding=(5, 12, 5, 12))
    ps("h2", fontName="FreeBold", fontSize=12, leading=17,
       textColor=DARK_BLUE, spaceAfter=6, spaceBefore=10,
       borderPadding=(0, 0, 3, 0))
    ps("h3", fontName="FreeBold", fontSize=10, leading=14,
       textColor=BLUE, spaceAfter=4, spaceBefore=8)
    ps("body",    fontName="Free", fontSize=9.5, leading=14,
       textColor=BLACK, spaceAfter=4, alignment=TA_JUSTIFY)
    ps("bullet",  fontName="Free", fontSize=9.5, leading=14,
       leftIndent=16, firstLineIndent=-10, spaceAfter=3,
       bulletIndent=6)
    ps("code",    fontName="FreeMono", fontSize=8.5, leading=13,
       backColor=colors.HexColor("#F5F5F5"), leftIndent=10,
       rightIndent=10, spaceAfter=6, spaceBefore=4,
       borderPadding=(4, 8, 4, 8))
    ps("warn",    fontName="FreeBold", fontSize=9, leading=13,
       textColor=colors.HexColor("#7B3000"), spaceAfter=4, spaceBefore=4,
       backColor=colors.HexColor("#FFF3CD"),
       borderPadding=(4, 8, 4, 8), leftIndent=0)
    ps("tip",     fontName="Free", fontSize=9, leading=13,
       textColor=colors.HexColor("#1A5732"), spaceAfter=4, spaceBefore=4,
       backColor=colors.HexColor("#D4EDDA"),
       borderPadding=(4, 8, 4, 8), leftIndent=0)
    ps("page_num", fontName="Free", fontSize=8, textColor=GREY_LINE,
       alignment=TA_CENTER)
    return s

ST = make_styles()

# ── Helper builders ──────────────────────────────────────────────────────────
def h1(txt):   return [Spacer(1, 0.15*cm), Paragraph(txt, ST["h1"]), Spacer(1, 0.1*cm)]
def h2(txt):   return [Spacer(1, 0.1*cm), Paragraph(txt, ST["h2"]), HRFlowable(width="100%", thickness=1, color=BLUE), Spacer(1, 0.05*cm)]
def h3(txt):   return [Paragraph(txt, ST["h3"])]
def body(txt): return [Paragraph(txt, ST["body"])]
def note(txt): return [Paragraph(txt, ST["note"])]
def warn(txt): return [Paragraph("⚠ " + txt, ST["warn"])]
def tip(txt):  return [Paragraph("✓ " + txt, ST["tip"])]
def sp(h=0.2): return [Spacer(1, h*cm)]
def hr():      return [HRFlowable(width="100%", thickness=0.5, color=GREY_LINE), Spacer(1, 0.1*cm)]

def bullets(items):
    return [Paragraph("• " + i, ST["bullet"]) for i in items]

def code_block(lines):
    text = "<br/>".join(lines)
    return [Paragraph(text, ST["code"])]

def make_table(headers, rows, col_widths=None):
    data = [headers] + rows
    style = TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0),  TABLE_HDR),
        ("TEXTCOLOR",    (0, 0), (-1, 0),  WHITE),
        ("FONTNAME",     (0, 0), (-1, 0),  "FreeBold"),
        ("FONTSIZE",     (0, 0), (-1, 0),  9),
        ("ALIGN",        (0, 0), (-1, -1), "LEFT"),
        ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
        ("FONTNAME",     (0, 1), (-1, -1), "Free"),
        ("FONTSIZE",     (0, 1), (-1, -1), 8.5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, TABLE_ALT]),
        ("GRID",         (0, 0), (-1, -1), 0.4, GREY_LINE),
        ("TOPPADDING",   (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 4),
        ("LEFTPADDING",  (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("ROWBACKGROUNDS", (0, 0), (-1, 0), [TABLE_HDR]),
    ])
    t = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    t.setStyle(style)
    return [t, Spacer(1, 0.2*cm)]

# ── Cover page ────────────────────────────────────────────────────────────────
def cover_page():
    items = []

    cover_data = [[""]]
    cover_style = TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), DARK_BLUE),
        ("TOPPADDING",  (0,0),(-1,-1), 40),
        ("BOTTOMPADDING",(0,0),(-1,-1),40),
    ])
    cover_tbl = Table(cover_data, colWidths=[17*cm])
    cover_tbl.setStyle(cover_style)

    items.append(Spacer(1, 2*cm))
    items.append(Paragraph("Інвестиції через", ST["title"]))
    items.append(Paragraph("Interactive Brokers", ST["title"]))
    items.append(Paragraph("для українців", ST["title"]))
    items.append(Spacer(1, 0.4*cm))
    items.append(Paragraph("Повний практичний гід — 2026", ST["subtitle"]))
    items.append(Spacer(1, 0.8*cm))

    info_rows = [
        ["Поповнення рахунку з України",  "Wise, Revolut, TransferGo — реальні комісії"],
        ["Вибір ETF для початківця",       "VWCE, SXR8, CSPX — що купити і чому"],
        ["Вивід коштів назад",             "SEPA → Wise → українська картка"],
        ["Оподаткування в Україні",        "18%+5% прибуток, 9%+5% дивіденди, W-8BEN"],
    ]
    info_style = TableStyle([
        ("BACKGROUND",   (0,0),(-1,-1), colors.HexColor("#1A3D6B")),
        ("TEXTCOLOR",    (0,0),(-1,-1), WHITE),
        ("FONTNAME",     (0,0),(0,-1),  "FreeBold"),
        ("FONTNAME",     (1,0),(1,-1),  "Free"),
        ("FONTSIZE",     (0,0),(-1,-1), 9),
        ("TOPPADDING",   (0,0),(-1,-1), 7),
        ("BOTTOMPADDING",(0,0),(-1,-1), 7),
        ("LEFTPADDING",  (0,0),(-1,-1), 12),
        ("RIGHTPADDING", (0,0),(-1,-1), 12),
        ("LINEBELOW",    (0,0),(-1,-2), 0.5, colors.HexColor("#2A5090")),
    ])
    info_tbl = Table(info_rows, colWidths=[7.5*cm, 9.5*cm])
    info_tbl.setStyle(info_style)
    items.append(info_tbl)
    items.append(Spacer(1, 1*cm))
    items.append(Paragraph("Актуальність: травень 2026 р. | Освітній матеріал, не є фінансовою порадою.",
                            ST["note"]))
    items.append(PageBreak())
    return items

# ── Header / footer ───────────────────────────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    # header bar
    canvas.setFillColor(DARK_BLUE)
    canvas.rect(0, h - 1.2*cm, w, 1.2*cm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("FreeBold", 9)
    canvas.drawString(1.5*cm, h - 0.8*cm, "Інвестиції через Interactive Brokers для українців — 2026")
    # footer
    canvas.setFillColor(GREY_LINE)
    canvas.rect(0, 0, w, 0.9*cm, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.setFont("Free", 8)
    canvas.drawCentredString(w/2, 0.3*cm, f"Стор. {doc.page}  |  Освітній матеріал — не є фінансовою чи юридичною порадою")
    canvas.restoreState()

# ── Main content ──────────────────────────────────────────────────────────────
def build_content():
    E = []  # elements

    # ── TOC ──────────────────────────────────────────────────────────────────
    E += [Paragraph("ЗМІСТ", ST["toc_title"])]
    E += [Paragraph("1. Поповнення рахунку IBKR з України", ST["toc_item"])]
    E += [Paragraph("   1.1 Обмеження НБУ — що заборонено і що дозволено", ST["toc_item"])]
    E += [Paragraph("   1.2 Спосіб 1 — Wise (рекомендований)", ST["toc_item"])]
    E += [Paragraph("   1.3 Спосіб 2 — Revolut", ST["toc_item"])]
    E += [Paragraph("   1.4 Спосіб 3 — TransferGo", ST["toc_item"])]
    E += [Paragraph("   1.5 Спосіб 4 — Zen", ST["toc_item"])]
    E += [Paragraph("   1.6 Порівняльна таблиця", ST["toc_item"])]
    E += [Paragraph("2. Вивід коштів з IBKR назад в Україну", ST["toc_item"])]
    E += [Paragraph("3. Які акції та ETF купити початківцю", ST["toc_item"])]
    E += [Paragraph("   3.1 Чому ETF, а не окремі акції", ST["toc_item"])]
    E += [Paragraph("   3.2 Важливо: VOO і VTI недоступні", ST["toc_item"])]
    E += [Paragraph("   3.3 Рекомендовані UCITS ETF", ST["toc_item"])]
    E += [Paragraph("   3.4 Накопичувальний vs розподільний тип", ST["toc_item"])]
    E += [Paragraph("   3.5 Як купити ETF в IBKR", ST["toc_item"])]
    E += [Paragraph("4. Сплата податків в Україні", ST["toc_item"])]
    E += [Paragraph("   4.1 Ставки ПДФО та військового збору", ST["toc_item"])]
    E += [Paragraph("   4.2 Розрахунок інвестиційного прибутку", ST["toc_item"])]
    E += [Paragraph("   4.3 Дивіденди та форма W-8BEN", ST["toc_item"])]
    E += [Paragraph("   4.4 Строки і порядок декларування", ST["toc_item"])]
    E += sp(0.4)
    E += hr()

    # ════════════════════════════════════════════════════════════════════════
    # РОЗДІЛ 1
    # ════════════════════════════════════════════════════════════════════════
    E += h1("РОЗДІЛ 1 — Поповнення рахунку IBKR з України")

    # 1.1
    E += h2("1.1  Обмеження НБУ — що заборонено і що дозволено")
    E += warn(
        "Під час воєнного стану НБУ заборонив фізичним особам здійснювати прямі "
        "міжнародні SWIFT-перекази на інвестиційні рахунки за кордоном. Тому "
        "поповнити IBKR напряму з українського банку (Monobank, ПриватБанк тощо) "
        "через SWIFT — неможливо."
    )
    E += body("Робочий шлях — через платіжних посередників із власними євро-реквізитами (SEPA), "
              "зокрема Wise, Revolut, TransferGo. Вони є юридичними особами ЄС і самостійно "
              "переказують кошти далі через SEPA.")
    E += sp()

    # 1.2
    E += h2("1.2  Спосіб 1 — Wise (рекомендований) ⭐")
    E += body("Принцип: українська євро-картка → Wise EUR рахунок → SEPA → IBKR")
    E += sp(0.1)
    E += h3("Що потрібно заздалегідь:")
    E += bullets([
        "Рахунок у Wise (реєстрація за паспортом або ID-карткою) — wise.com",
        "MasterCard євро-картка від Monobank або Приватбанку",
        "УВАГА: VISA від українських банків Wise не приймає з 30.07.2024 — тільки Mastercard",
    ])
    E += sp(0.1)
    E += h3("Комісії при поповненні Wise:")
    E += make_table(
        ["Метод поповнення Wise", "Комісія Wise", "Комісія банку", "Разом"],
        [
            ["Google Pay (MasterCard EUR Mono)",    "~0.41%",       "~0%",                "~0.41%"],
            ["Картка MasterCard EUR напряму",       "~0.41–0.65%",  "~1% (Mono) / ~2% (Privat)", "~1.4–2.6%"],
            ["SEPA з Wise EUR балансу",             "0%",           "—",                  "0%"],
        ],
        col_widths=[7.5*cm, 3.2*cm, 3.8*cm, 3*cm]
    )
    E += tip("Найдешевший варіант: поповнити Wise євро-карткою через Google Pay — комісія ~0.41%")
    E += sp(0.1)
    E += h3("Ліміти:")
    E += bullets([
        "З валютних карток (EUR) — до 100 000 UAH/місяць в еквіваленті",
        "Без верифікації Wise: до 1 000 EUR на переказ",
        "Після верифікації особи: ліміти суттєво вищі",
    ])
    E += sp(0.1)
    E += h3("Крок за кроком — налаштувати IBKR для прийому SEPA:")
    E += bullets([
        "Зайти в IBKR: Меню → Transfer & Pay → Transfer Funds → Deposit",
        "Обрати валюту: EUR",
        "Обрати метод: Electronic Funds Transfer (SEPA)",
        "Система покаже реквізити IBKR — скопіювати IBAN та BIC/SWIFT IBKR",
    ])
    E += sp(0.1)
    E += h3("Крок за кроком — відправити гроші з Wise:")
    E += bullets([
        "В додатку Wise: Send money → On your own → To Account number",
        "Обрати відправку в EUR",
        "Вставити реквізити IBKR (IBAN + BIC)",
        "У полі Reference / Призначення платежу — обов'язково вказати свій номер рахунку IBKR (напр.: U12345678)",
        "Підтвердити переказ",
    ])
    E += body("<b>Час зарахування:</b> 1–2 робочих дні  |  <b>Комісія IBKR за вхідний переказ:</b> безкоштовно")
    E += sp()

    # 1.3
    E += h2("1.3  Спосіб 2 — Revolut")
    E += body("Принцип аналогічний Wise — Revolut має власні євро-реквізити (SEPA).")
    E += make_table(
        ["Параметр", "Деталі"],
        [
            ["Комісія Revolut за переказ EUR",   "0% (стандартний план, в межах ліміту)"],
            ["Поповнення Revolut з Mono",         "~1% (комісія Monobank)"],
            ["Ліміт безкомісійного обміну",       "до £1 000/місяць (стандарт)"],
            ["Ризик",                             "⚠ Revolut може заблокувати рахунок без попередження"],
        ],
        col_widths=[7*cm, 10*cm]
    )
    E += tip("Revolut — робочий варіант, але Wise стабільніший і менш схильний до блокувань.")
    E += sp()

    # 1.4
    E += h2("1.4  Спосіб 3 — TransferGo")
    E += bullets([
        "Сервіс орієнтований на українців, підтримує гривневий напрямок",
        "Комісія: ~0.5–1.5% залежно від суми і валюти",
        "Переказ EUR → IBKR через власний SEPA рахунок TransferGo",
        "Перевірити актуальні тарифи на transfergo.com",
    ])
    E += sp()

    # 1.5
    E += h2("1.5  Спосіб 4 — Zen (платіжна система)")
    E += make_table(
        ["Параметр", "Значення"],
        [
            ["Комісія Zen",                  "~2.5%"],
            ["Комісія Monobank за оплату",   "~1%"],
            ["Комісія ПриватБанку",          "~2%"],
            ["Разом",                        "~3.5–4.5%"],
        ],
        col_widths=[7*cm, 10*cm]
    )
    E += warn("Zen — дорого. Підходить лише якщо інші способи недоступні.")
    E += sp()

    # 1.6
    E += h2("1.6  Порівняльна таблиця способів поповнення")
    E += make_table(
        ["Спосіб", "Ефект. комісія", "Час", "Надійність", "Мін. сума"],
        [
            ["Wise + Google Pay",  "~0.41%",       "1–2 дні",  "⭐⭐⭐⭐⭐", "€50"],
            ["Wise картка",        "~1.4–2.6%",    "1–2 дні",  "⭐⭐⭐⭐⭐", "€50"],
            ["Revolut",            "~1%",          "1–2 дні",  "⭐⭐⭐⭐",  "€50"],
            ["TransferGo",         "~0.5–1.5%",    "1–3 дні",  "⭐⭐⭐⭐",  "€50"],
            ["Zen",                "~3.5–4.5%",    "1–2 дні",  "⭐⭐⭐",   "€50"],
            ["SWIFT прямий",       "$12–$55 фікс", "2–4 дні",  "⚠ обмежено", "$200+"],
        ],
        col_widths=[4.5*cm, 3.5*cm, 2.5*cm, 3.5*cm, 2.5*cm]
    )

    # ════════════════════════════════════════════════════════════════════════
    # РОЗДІЛ 2
    # ════════════════════════════════════════════════════════════════════════
    E += h1("РОЗДІЛ 2 — Вивід коштів з IBKR назад в Україну")

    E += h2("2.1  Ліміти та комісії IBKR за вивід")
    E += make_table(
        ["Тип виводу", "Перший на місяць", "Кожний наступний"],
        [
            ["SEPA (EUR)",         "безкоштовно", "€1"],
            ["Wire transfer (USD)", "безкоштовно", "$10"],
        ],
        col_widths=[7*cm, 5*cm, 5*cm]
    )
    E += tip("IBKR надає 1 безкоштовний вивід на місяць незалежно від суми. Плануйте вивід 1 раз/місяць.")
    E += sp(0.1)

    E += h2("2.2  Як вивести гроші на Wise (покрокова інструкція)")
    E += bullets([
        "В IBKR: Transfer & Pay → Transfer Funds → Withdraw → Wire (SEPA)",
        "Обрати EUR, ввести реквізити свого Wise EUR рахунку (IBAN)",
        "Wise отримає кошти → можна конвертувати в UAH та перевести на українську картку",
        "Конвертація Wise EUR → UAH: ~0.35–0.65% комісія",
    ])
    E += sp(0.1)
    E += h2("2.3  Важливі правила виводу")
    E += bullets([
        "IBKR переказує ТІЛЬКИ на рахунок власника (не третіх осіб)",
        "Перший вивід може потребувати верифікації способу виводу (до 3–5 днів)",
        "Гривневих виводів IBKR не підтримує — тільки через конвертацію в Wise/Revolut",
        "Мінімальна сума виводу через SEPA: €1",
    ])

    # ════════════════════════════════════════════════════════════════════════
    # РОЗДІЛ 3
    # ════════════════════════════════════════════════════════════════════════
    E += h1("РОЗДІЛ 3 — Які акції та ETF купити початківцю")

    E += h2("3.1  Чому ETF, а не окремі акції?")
    E += make_table(
        ["Критерій", "ETF", "Окремі акції"],
        [
            ["Диверсифікація",     "Автоматична (сотні компаній)", "Тільки якщо купити багато різних"],
            ["Ризик",              "Менший",                       "Вищий"],
            ["Час на аналіз",      "Мінімальний",                  "Постійний моніторинг"],
            ["Комісія управління", "0.03–0.22%/рік",               "0% (але є ризик помилок)"],
            ["Підхід",             "Пасивний",                     "Активний"],
        ],
        col_widths=[4.5*cm, 6.5*cm, 6*cm]
    )
    E += tip("ETF — найкращий старт для початківця. Не потрібно вибирати 'правильні' акції.")
    E += sp()

    E += h2("3.2  ВАЖЛИВО: VOO та VTI недоступні для українців!")
    E += warn(
        "Популярні американські ETF VOO (Vanguard S&P 500) та VTI (Vanguard Total Stock Market) "
        "НЕДОСТУПНІ для резидентів ЄС та України через регуляцію PRIIPs/MiFID II — вони не мають "
        "KID (Key Information Document) для роздрібних інвесторів. "
        "Замість них використовуйте UCITS ETF — аналоги, зареєстровані в Ірландії/Люксембурзі."
    )
    E += sp()

    E += h2("3.3  Рекомендовані UCITS ETF")
    E += h3("Категорія 1: S&P 500 (500 найбільших компаній США)")
    E += make_table(
        ["Тікер", "Назва ETF", "Біржа", "Валюта", "TER/рік", "Тип"],
        [
            ["CSPX", "iShares Core S&P 500 UCITS ETF",     "LSE",   "USD", "0.07%", "Накопич."],
            ["SXR8", "iShares Core S&P 500 UCITS ETF",     "XETRA", "EUR", "0.07%", "Накопич."],
            ["VUSD", "Vanguard S&P 500 UCITS ETF",         "LSE",   "USD", "0.07%", "Розподіл."],
            ["VUSA", "Vanguard S&P 500 UCITS ETF",         "LSE",   "USD", "0.07%", "Розподіл."],
        ],
        col_widths=[1.8*cm, 6.5*cm, 2*cm, 2*cm, 2*cm, 2.7*cm]
    )
    E += tip("SXR8 (EUR, XETRA) — простіше поповнювати у євро та уникнути конвертацій USD/EUR. CSPX — якщо хочете USD рахунок.")
    E += sp(0.1)

    E += h3("Категорія 2: Весь світ (~3 500 компаній з 50 країн)")
    E += make_table(
        ["Тікер", "Назва ETF", "Біржа", "Валюта", "TER/рік", "Тип"],
        [
            ["VWCE", "Vanguard FTSE All-World UCITS ETF Acc", "XETRA", "EUR", "0.22%", "Накопич."],
            ["VWRL", "Vanguard FTSE All-World UCITS ETF",     "LSE",   "USD", "0.22%", "Розподіл."],
            ["IWDA", "iShares Core MSCI World UCITS ETF",     "LSE",   "USD", "0.20%", "Накопич."],
        ],
        col_widths=[1.8*cm, 6.5*cm, 2*cm, 2*cm, 2*cm, 2.7*cm]
    )
    E += tip("VWCE — найпопулярніший вибір серед пасивних інвесторів Європи (включає і ринки, що розвиваються).")
    E += sp(0.1)

    E += h3("Категорія 3: Технологічний сектор (вищий ризик!)")
    E += make_table(
        ["Тікер", "Назва ETF", "TER/рік", "Ризик"],
        [
            ["EQQQ", "Invesco EQQQ NASDAQ-100 UCITS ETF", "0.30%", "Вищий (концентровано в tech)"],
            ["SXRV", "iShares NASDAQ 100 UCITS ETF",      "0.33%", "Вищий"],
        ],
        col_widths=[2*cm, 7.5*cm, 2.5*cm, 5*cm]
    )
    E += warn("Технологічні ETF — волатильніші. Не рекомендується як єдиний інструмент для початківця.")
    E += sp()

    E += h2("3.4  Накопичувальний (Acc) vs Розподільний (Dist/Inc)")
    E += make_table(
        ["Тип", "Що відбувається з дивідендами", "Оподаткування в UA"],
        [
            ["Accumulating (Acc)", "Реінвестуються автоматично", "Платите податок тільки при продажу"],
            ["Distributing (Dist/Inc)", "Виплачуються на рахунок", "14% (9%+5%) щороку з дивідендів"],
        ],
        col_widths=[4*cm, 6.5*cm, 6.5*cm]
    )
    E += tip("Для початківця рекомендується Accumulating (Acc) — менше податкової роботи, ефект складних відсотків.")
    E += sp()

    E += h2("3.5  Як купити ETF в IBKR — покрокова інструкція")
    E += bullets([
        "Увійти в IBKR → Trade → Find Investment → Search",
        "Ввести тікер, наприклад SXR8",
        "Вибрати біржу: XETRA (для SXR8/VWCE у EUR) або LSE (для CSPX у USD)",
        "Натиснути Buy",
        "Тип ордеру: Limit Order (ви вказуєте ціну купівлі) — рекомендовано",
        "Вказати кількість акцій (1 акція SXR8 ≈ €500–600, VWCE ≈ €110–130)",
        "Підтвердити угоду",
    ])
    E += body("<b>Комісія IBKR</b> за купівлю ETF на XETRA/LSE: ~0.05% від суми (мін. €1.25)")
    E += sp()

    E += h2("3.6  Портфель «лінивого інвестора» — стратегія «купи і тримай»")
    E += make_table(
        ["Варіант", "Склад", "Для кого"],
        [
            ["A — максимально просто", "100% VWCE", "Абсолютний початківець, один ETF"],
            ["B — більше США",         "80% SXR8 + 20% VWCE", "Вірить в американську економіку"],
            ["C — з облігаціями",      "70% SXR8 + 20% VWCE + 10% AGGH", "Менший ризик, старший вік"],
        ],
        col_widths=[4.5*cm, 6.5*cm, 6*cm]
    )

    # ════════════════════════════════════════════════════════════════════════
    # РОЗДІЛ 4
    # ════════════════════════════════════════════════════════════════════════
    E += h1("РОЗДІЛ 4 — Сплата податків в Україні")
    E += warn(
        "Українські податкові резиденти ЗОБОВ'ЯЗАНІ декларувати всі іноземні доходи, "
        "включно з інвестиційними прибутками та дивідендами. Незадеклароване = штраф."
    )
    E += sp(0.1)

    E += h2("4.1  Ставки податків 2025–2026")
    E += make_table(
        ["Вид доходу", "ПДФО", "Військовий збір", "Разом"],
        [
            ["Продаж акцій / ETF (прибуток)",           "18%", "5%", "23%"],
            ["Дивіденди з іноземних компаній",           "9%",  "5%", "14%"],
            ["Дивіденди від укр. компаній (платник ПнП)", "5%", "5%", "10%"],
            ["Відсотки (депозити, ОВДП)",                "18%", "5%", "23%"],
        ],
        col_widths=[7.5*cm, 2.5*cm, 3.5*cm, 2.5*cm]
    )
    E += warn("Військовий збір підвищено з 1.5% до 5% у 2024 р. — враховуйте це при плануванні.")
    E += sp()

    E += h2("4.2  Як розрахувати інвестиційний прибуток")
    E += body("<b>Формула:</b>  Прибуток = (Ціна продажу в UAH) − (Ціна купівлі в UAH) − (Комісії брокера в UAH)")
    E += bullets([
        "Всі суми перераховуються у гривні за офіційним курсом НБУ на дату кожної операції",
        "Комісії брокера (trading fees) ЗМЕНШУЮТЬ оподатковуваний прибуток",
        "Збиток в одному році переноситься на наступні роки",
    ])
    E += sp(0.1)
    E += h3("Числовий приклад:")
    E += make_table(
        ["Операція", "EUR", "Курс НБУ", "Сума в UAH"],
        [
            ["Купівля 10 акцій SXR8 @ €500",  "€5 000",  "44 грн/€",  "220 000 грн"],
            ["Продаж 10 акцій SXR8 @ €600",   "€6 000",  "46 грн/€",  "276 000 грн"],
            ["Комісія брокера (€12)",          "€12",     "46 грн/€",  "552 грн"],
            ["Прибуток оподатковуваний",       "—",       "—",         "55 448 грн"],
            ["ПДФО 18%",                       "—",       "—",         "9 981 грн"],
            ["ВЗ 5%",                          "—",       "—",         "2 772 грн"],
            ["До сплати РАЗОМ",                "—",       "—",         "12 753 грн (~$300)"],
        ],
        col_widths=[6*cm, 2.5*cm, 3*cm, 5.5*cm]
    )
    E += sp()

    E += h2("4.3  Дивіденди та форма W-8BEN")
    E += h3("Форма W-8BEN — обов'язково підписати в IBKR!")
    E += make_table(
        ["Статус", "Withholding tax США"],
        [
            ["Без W-8BEN", "30% утримується автоматично"],
            ["З W-8BEN",   "15% (за угодою UA-USA про уникнення подвійного оподаткування)"],
        ],
        col_widths=[5*cm, 12*cm]
    )
    E += body("Підписати в IBKR: Settings → Tax Forms → W-8BEN. Дійсна 3 роки, потім потрібне оновлення.")
    E += sp(0.1)
    E += h3("Зарахування іноземного податку:")
    E += bullets([
        "США утримала 15% withholding tax з дивідендів",
        "В Україні потрібно сплатити 14% (9% ПДФО + 5% ВЗ)",
        "Оскільки 15% > 14% — доплачувати в Україні НЕ ПОТРІБНО",
        "Але декларацію подати ОБОВ'ЯЗКОВО",
    ])
    E += sp(0.1)
    E += tip(
        "Для Accumulating ETF (VWCE, SXR8, CSPX) дивіденди реінвестуються всередині фонду — "
        "ви не отримуєте їх на рахунок, тому дивідендного доходу для декларування немає. "
        "Ви платите лише 23% при ПРОДАЖУ ETF."
    )
    E += sp()

    E += h2("4.4  Строки та порядок декларування")
    E += make_table(
        ["Дія", "Строк"],
        [
            ["Подання декларації про доходи",    "до 1 травня наступного за звітним року"],
            ["Сплата задекларованого ПДФО та ВЗ", "до 1 серпня наступного за звітним року"],
        ],
        col_widths=[8*cm, 9*cm]
    )
    E += h3("Де подавати:")
    E += bullets([
        "Онлайн: Кабінет платника ДПС → portal.tax.gov.ua",
        "Або в паперовому вигляді у своїй ДПІ",
    ])
    E += sp(0.1)
    E += h3("Що підготувати:")
    E += bullets([
        "Річний звіт IBKR (Annual Statement / Tax Report) — IBKR: Reports → Tax Docs → Annual",
        "Курси НБУ на дати всіх операцій: bank.gov.ua → Архів курсів",
        "Підтвердження сплаченого іноземного податку (для заліку withholding tax)",
    ])
    E += sp(0.1)
    E += h3("Яку форму заповнювати:")
    E += bullets([
        "Декларація про майновий стан і доходи",
        "Додаток Ф1 — для інвестиційного прибутку від продажу активів",
    ])
    E += sp()
    E += h2("4.5  Практичні поради щодо оптимізації")
    E += bullets([
        "Тримайте ETF довго (5–10+ років) — не продавайте без потреби, відкладаючи сплату податку",
        "Використовуйте Accumulating ETF — уникаєте щорічного декларування дивідендів",
        "Фіксуйте збитки у поганий рік — зменшуєте податкову базу наступного",
        "Зберігайте всі виписки IBKR — для підтвердження витрат при покупці",
        "Зверніться до податкового консультанта для першої декларації — помилки дорого коштують",
    ])
    E += sp()

    # ── Шпаргалка ────────────────────────────────────────────────────────────
    E += h1("ШВИДКА ШПАРГАЛКА")
    cheat_data = [
        ["ТЕМА", "ДІЯ", "ДЕТАЛІ"],
        ["Поповнення IBKR", "UAH картка → Wise → IBKR", "Комісія ~0.41%, час 1–2 дні"],
        ["Перший ETF",       "Купити VWCE або SXR8",     "XETRA, EUR, тип Acc"],
        ["Вивід з IBKR",     "SEPA → Wise → UAH картка", "1-й вивід/міс безкоштовно"],
        ["Продаж ETF",       "Прибуток × 23%",           "18% ПДФО + 5% ВЗ"],
        ["Дивіденди",        "Підписати W-8BEN!",         "15% withholding USA ≥ 14% UA"],
        ["Декларація",       "Подати до 1 травня",        "Сплатити до 1 серпня"],
    ]
    cheat_style = TableStyle([
        ("BACKGROUND",    (0,0), (-1, 0),  DARK_BLUE),
        ("TEXTCOLOR",     (0,0), (-1, 0),  WHITE),
        ("FONTNAME",      (0,0), (-1, 0),  "FreeBold"),
        ("FONTSIZE",      (0,0), (-1, 0),  9),
        ("BACKGROUND",    (0,1), (0,-1),   BLUE),
        ("TEXTCOLOR",     (0,1), (0,-1),   WHITE),
        ("FONTNAME",      (0,1), (0,-1),   "FreeBold"),
        ("FONTNAME",      (1,1), (-1,-1),  "Free"),
        ("FONTSIZE",      (0,1), (-1,-1),  9),
        ("ROWBACKGROUNDS",(1,1), (-1,-1),  [WHITE, TABLE_ALT]),
        ("GRID",          (0,0), (-1,-1),  0.4, GREY_LINE),
        ("TOPPADDING",    (0,0), (-1,-1),  6),
        ("BOTTOMPADDING", (0,0), (-1,-1),  6),
        ("LEFTPADDING",   (0,0), (-1,-1),  8),
        ("RIGHTPADDING",  (0,0), (-1,-1),  8),
        ("ALIGN",         (0,0), (-1,-1),  "LEFT"),
        ("VALIGN",        (0,0), (-1,-1),  "MIDDLE"),
    ])
    cheat_tbl = Table(cheat_data, colWidths=[4*cm, 5.5*cm, 7.5*cm], repeatRows=1)
    cheat_tbl.setStyle(cheat_style)
    E.append(cheat_tbl)
    E += sp(0.3)
    E += note("Складено на основі публічних джерел станом на травень 2026 р. "
              "Перевіряйте актуальні обмеження НБУ та ставки ДПС — вони можуть змінюватися. "
              "Не є фінансовою, юридичною або податковою порадою.")
    return E

# ── Build PDF ─────────────────────────────────────────────────────────────────
def main():
    out = "/home/user/PersonalFinance/ukraine_ibkr_guide_2026.pdf"
    doc = SimpleDocTemplate(
        out,
        pagesize=A4,
        leftMargin=1.8*cm, rightMargin=1.8*cm,
        topMargin=1.6*cm,  bottomMargin=1.4*cm,
        title="Інвестиції через Interactive Brokers для українців 2026",
        author="PersonalFinance Guide",
    )
    story = cover_page() + build_content()
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f"PDF saved: {out}")

if __name__ == "__main__":
    main()
