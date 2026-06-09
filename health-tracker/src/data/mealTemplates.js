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
