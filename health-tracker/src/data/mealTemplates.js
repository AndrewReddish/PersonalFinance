// Meal templates — pre-built combinations for quick logging
// category: "healthy" | "balanced" | "treat"
// items: array of { foodId, weight } matching FOODS ids

export const TEMPLATE_CATEGORIES = {
  healthy:  { label: "💚 Корисне",       color: "#16a34a", bg: "#dcfce7" },
  balanced: { label: "🟡 Збалансоване",  color: "#d97706", bg: "#fef9c3" },
  treat:    { label: "🔴 Слабкість",     color: "#dc2626", bg: "#fee2e2" },
};

export const MEAL_TEMPLATES = [
  // ── КОРИСНЕ ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Шпинат + яйця + вівсянка",
    emoji: "🥬",
    category: "healthy",
    description: "Класичний ранковий старт",
    items: [
      { foodId: 20, weight: 80 },   // вівсянка суха → ~240г варена
      { foodId: 2,  weight: 150 },  // 3 яйця
      { foodId: 36, weight: 100 },  // шпинат
    ],
  },
  {
    id: 2,
    name: "Куряча грудка + гречка + броколі",
    emoji: "🍗",
    category: "healthy",
    description: "Чисте м'ясо + складні вуглеводи",
    items: [
      { foodId: 1,  weight: 150 },  // куряча грудка
      { foodId: 21, weight: 200 },  // гречка варена
      { foodId: 30, weight: 150 },  // броколі
    ],
  },
  {
    id: 3,
    name: "Тунець + бурий рис + овочі",
    emoji: "🐟",
    category: "healthy",
    description: "Легко, швидко, багато білку",
    items: [
      { foodId: 4,  weight: 150 },  // тунець консерва
      { foodId: 22, weight: 200 },  // бурий рис варений
      { foodId: 32, weight: 120 },  // огірок
      { foodId: 33, weight: 120 },  // помідор
    ],
  },
  {
    id: 4,
    name: "Сир кисломолочний + йогурт + ягоди",
    emoji: "🍓",
    category: "healthy",
    description: "Білковий сніданок або перекус",
    items: [
      { foodId: 10, weight: 200 },  // сир кисломолочний
      { foodId: 11, weight: 150 },  // грецький йогурт
      { foodId: 43, weight: 80 },   // ягоди
    ],
  },
  {
    id: 5,
    name: "Індичка + гречка + шпинат",
    emoji: "🦃",
    category: "healthy",
    description: "Дієтичне м'ясо з кашею",
    items: [
      { foodId: 7,  weight: 180 },  // індичка варена
      { foodId: 21, weight: 200 },  // гречка
      { foodId: 36, weight: 100 },  // шпинат
    ],
  },
  {
    id: 6,
    name: "Риба + картопля + овочі",
    emoji: "🐡",
    category: "healthy",
    description: "Біла риба з овочевим гарніром",
    items: [
      { foodId: 8,  weight: 150 },  // біла риба запечена
      { foodId: 24, weight: 250 },  // картопля запечена
      { foodId: 32, weight: 80  },  // огірок
      { foodId: 33, weight: 100 },  // помідор
      { foodId: 37, weight: 30  },  // кукурудза консервована
    ],
  },
  {
    id: 7,
    name: "Куряче філе + картопля + шпинат",
    emoji: "🍗",
    category: "healthy",
    description: "Висококалорійний білок + повільні вуглеводи",
    items: [
      { foodId: 1,  weight: 180 },  // куряча грудка
      { foodId: 24, weight: 200 },  // картопля запечена
      { foodId: 36, weight: 80  },  // шпинат
    ],
  },
  {
    id: 8,
    name: "Курка + гречка + овочі мікс",
    emoji: "🥘",
    category: "healthy",
    description: "Чисте м'ясо + гречка + заморожені овочі",
    items: [
      { foodId: 1,  weight: 150 },  // куряча грудка
      { foodId: 21, weight: 180 },  // гречка варена
      { foodId: 39, weight: 150 },  // овочі мікс
    ],
  },
  {
    id: 9,
    name: "Омлет + вівсянка + шпинат + овочі",
    emoji: "🍳",
    category: "healthy",
    description: "Легкий сніданок з яйцями і кашею",
    items: [
      { foodId: 2,  weight: 120 },  // яйця (~2-3 шт)
      { foodId: 29, weight: 150 },  // вівсянка варена (порідж)
      { foodId: 36, weight: 80  },  // шпинат
      { foodId: 32, weight: 80  },  // огірок
      { foodId: 34, weight: 80  },  // болгарський перець
    ],
  },
  {
    id: 15,
    name: "Курка гриль + гречка з грибами + овочі",
    emoji: "🍖",
    category: "healthy",
    description: "Смажена курка + гречка з грибами",
    items: [
      { foodId: 1,  weight: 180 },  // куряча грудка/гриль
      { foodId: 21, weight: 150 },  // гречка варена
      { foodId: 45, weight: 50  },  // гриби шампіньйони
      { foodId: 32, weight: 100 },  // огірок
      { foodId: 33, weight: 80  },  // помідор
    ],
  },
  {
    id: 16,
    name: "Яєчня + овочі + хумус",
    emoji: "🥚",
    category: "healthy",
    description: "Легка яєчня зі свіжими овочами і хумусом",
    items: [
      { foodId: 2,  weight: 110 },  // яйця (~2 шт)
      { foodId: 32, weight: 100 },  // огірок
      { foodId: 33, weight: 120 },  // помідор
      { foodId: 54, weight: 30  },  // хумус
    ],
  },

  // ── ЗБАЛАНСОВАНЕ ─────────────────────────────────────────────────────
  {
    id: 10,
    name: "Шаварма з індичкою",
    emoji: "🌯",
    category: "balanced",
    description: "Індичка + хумус + йогурт + багато овочів",
    items: [
      { foodId: 7,  weight: 180 },  // індичка
      { foodId: 23, weight: 60 },   // цільнозерновий хліб (лаваш ~2 скибочки)
      { foodId: 11, weight: 50 },   // грецький йогурт (соус)
      { foodId: 54, weight: 40 },   // хумус
      { foodId: 33, weight: 120 },  // помідор
      { foodId: 32, weight: 120 },  // огірок
      { foodId: 34, weight: 100 },  // болгарський перець
    ],
  },
  {
    id: 11,
    name: "Лосось + картопля + броколі",
    emoji: "🐠",
    category: "balanced",
    description: "Жирна риба + повільні вуглеводи",
    items: [
      { foodId: 3,  weight: 150 },  // лосось запечений
      { foodId: 24, weight: 200 },  // картопля запечена
      { foodId: 30, weight: 150 },  // броколі
    ],
  },
  {
    id: 12,
    name: "Слабосолоний лосось + яйця + авокадо",
    emoji: "🥑",
    category: "balanced",
    description: "Корисні жири + білок",
    items: [
      { foodId: 60, weight: 100 },  // слабосолоний лосось
      { foodId: 2,  weight: 100 },  // 2 яйця
      { foodId: 50, weight: 75 },   // авокадо половинка
      { foodId: 23, weight: 30 },   // скибочка хліба
    ],
  },
  {
    id: 13,
    name: "Куряче стегно + макарони + салат",
    emoji: "🍝",
    category: "balanced",
    description: "Ситний обід",
    items: [
      { foodId: 6,  weight: 180 },  // куряче стегно
      { foodId: 25, weight: 200 },  // макарони варені
      { foodId: 33, weight: 120 },  // помідор
      { foodId: 32, weight: 120 },  // огірок
      { foodId: 51, weight: 14 },   // оливкова олія
    ],
  },
  {
    id: 14,
    name: "Консервований тунець + лаваш + овочі",
    emoji: "🥙",
    category: "balanced",
    description: "Швидкий перекус або легкий обід",
    items: [
      { foodId: 4,  weight: 150 },  // тунець
      { foodId: 23, weight: 60 },   // хліб
      { foodId: 32, weight: 120 },  // огірок
      { foodId: 33, weight: 120 },  // помідор
      { foodId: 11, weight: 50 },   // йогурт як соус
    ],
  },
  {
    id: 17,
    name: "Лосось + булгур + шпинат + яйце",
    emoji: "🐟",
    category: "balanced",
    description: "Omega-3 + складні вуглеводи + свіжі овочі",
    items: [
      { foodId: 60, weight: 80  },  // слабосолоний лосось
      { foodId: 27, weight: 150 },  // булгур варений
      { foodId: 2,  weight: 60  },  // яйце варене (1 шт)
      { foodId: 36, weight: 80  },  // шпинат
      { foodId: 32, weight: 60  },  // огірок
      { foodId: 23, weight: 30  },  // хліб тостовий
    ],
  },
  {
    id: 18,
    name: "Паста з фаршем",
    emoji: "🍝",
    category: "balanced",
    description: "Класична паста болоньєзе з томатним соусом",
    items: [
      { foodId: 25, weight: 200 },  // макарони варені
      { foodId: 9,  weight: 120 },  // фарш м'ясний
      { foodId: 38, weight: 60  },  // томатний соус
    ],
  },
  {
    id: 19,
    name: "Сирники + полуниця + йогурт",
    emoji: "🧁",
    category: "balanced",
    description: "Смачний сніданок на основі сиру",
    items: [
      { foodId: 15, weight: 200 },  // сирники
      { foodId: 43, weight: 100 },  // полуниця / ягоди
      { foodId: 11, weight: 50  },  // грецький йогурт
    ],
  },
  {
    id: 25,
    name: "Бурріто / врап з яловичиною",
    emoji: "🌯",
    category: "balanced",
    description: "М'ясний врап з тортильєю і свіжими овочами",
    items: [
      { foodId: 28, weight: 70  },  // тортилья / лаваш
      { foodId: 16, weight: 100 },  // яловичина тушкована
      { foodId: 37, weight: 30  },  // кукурудза
      { foodId: 35, weight: 40  },  // капуста
      { foodId: 33, weight: 40  },  // помідор
      { foodId: 32, weight: 30  },  // огірок
    ],
  },
  {
    id: 26,
    name: "Омлет + лосось + огірок + крем-сир",
    emoji: "🥑",
    category: "balanced",
    description: "Ніжний омлет з лососем і кремовим сиром",
    items: [
      { foodId: 2,  weight: 150 },  // яйця (омлет ~3-4 шт)
      { foodId: 60, weight: 60  },  // слабосолоний лосось
      { foodId: 32, weight: 120 },  // огірок
      { foodId: 14, weight: 20  },  // крем-сир Philadelphia
    ],
  },
  {
    id: 27,
    name: "Свинина + картопля + шпинат",
    emoji: "🥩",
    category: "balanced",
    description: "Ситний стейк із запеченою картоплею",
    items: [
      { foodId: 17, weight: 200 },  // свинина стейк
      { foodId: 24, weight: 200 },  // картопля запечена
      { foodId: 36, weight: 40  },  // шпинат свіжий
    ],
  },

  // ── СЛАБКІСТЬ ─────────────────────────────────────────────────────────
  {
    id: 20,
    name: "Суші сет (моя половина)",
    emoji: "🍣",
    category: "treat",
    description: "~450г зі спільного сету на 900г",
    items: [
      { foodId: 61, weight: 450 },
    ],
  },
  {
    id: 21,
    name: "McDonald's — Дабл Роял Чизбургер",
    emoji: "🍔",
    category: "treat",
    description: "Класика. Без докорів сумління.",
    items: [
      { foodId: 62, weight: 277 },
    ],
  },
  {
    id: 22,
    name: "McDonald's — Сніданок подвійна свиняча",
    emoji: "🥞",
    category: "treat",
    description: "Сніданок зі свининою та яйцем",
    items: [
      { foodId: 63, weight: 234 },
    ],
  },
  {
    id: 23,
    name: "McDonald's — Повний сніданок",
    emoji: "🍟",
    category: "treat",
    description: "Сніданок + картопля фрі",
    items: [
      { foodId: 63, weight: 234 },
      { foodId: 64, weight: 154 },
    ],
  },
  {
    id: 24,
    name: "McDonald's — Дабл Роял + картопля",
    emoji: "🍔",
    category: "treat",
    description: "Повний комбо",
    items: [
      { foodId: 62, weight: 277 },
      { foodId: 64, weight: 154 },
    ],
  },
];
