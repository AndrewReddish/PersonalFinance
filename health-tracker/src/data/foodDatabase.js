// KBZHU per 100g: { kcal, protein, fat, carbs }
export const FOOD_CATEGORIES = {
  protein: "🥩 Білки",
  carbs: "🌾 Вуглеводи",
  vegetables: "🥦 Овочі",
  fruits: "🍎 Фрукти",
  dairy: "🥛 Молочні",
  fats: "🥑 Жири",
  treats: "🍣 Смаколики",
};

export const FOODS = [
  // Proteins
  { id: 1, name: "Куряча грудка (варена)", category: "protein", per100g: { kcal: 165, protein: 31, fat: 3.6, carbs: 0 }, portions: [{ label: "Мала (100г)", weight: 100 }, { label: "Середня (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }] },
  { id: 2, name: "Яйце куряче (варене)", category: "protein", per100g: { kcal: 155, protein: 13, fat: 11, carbs: 1.1 }, portions: [{ label: "1 шт (50г)", weight: 50 }, { label: "2 шт (100г)", weight: 100 }, { label: "3 шт (150г)", weight: 150 }] },
  { id: 3, name: "Лосось (запечений)", category: "protein", per100g: { kcal: 208, protein: 20, fat: 13, carbs: 0 }, portions: [{ label: "Мала (100г)", weight: 100 }, { label: "Середня (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }] },
  { id: 4, name: "Тунець (консерва в воді)", category: "protein", per100g: { kcal: 96, protein: 21, fat: 1, carbs: 0 }, portions: [{ label: "Мала (80г)", weight: 80 }, { label: "Банка (150г)", weight: 150 }] },
  { id: 5, name: "Сочевиця (варена)", category: "protein", per100g: { kcal: 116, protein: 9, fat: 0.4, carbs: 20 }, portions: [{ label: "Мала (150г)", weight: 150 }, { label: "Середня (200г)", weight: 200 }, { label: "Велика (250г)", weight: 250 }] },
  { id: 6, name: "Куряче стегно без шкіри", category: "protein", per100g: { kcal: 179, protein: 25, fat: 8, carbs: 0 }, portions: [{ label: "Мала (100г)", weight: 100 }, { label: "Середня (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }] },
  { id: 7, name: "Індичка (варена)", category: "protein", per100g: { kcal: 189, protein: 29, fat: 7, carbs: 0 }, portions: [{ label: "Середня (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }] },

  // Dairy
  { id: 10, name: "Сир кисломолочний (5%)", category: "dairy", per100g: { kcal: 121, protein: 17, fat: 5, carbs: 3 }, portions: [{ label: "Середня (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }, { label: "XL (250г)", weight: 250 }] },
  { id: 11, name: "Грецький йогурт (0%)", category: "dairy", per100g: { kcal: 59, protein: 10, fat: 0.4, carbs: 3.6 }, portions: [{ label: "Стакан (150г)", weight: 150 }, { label: "Великий (200г)", weight: 200 }] },
  { id: 12, name: "Молоко (2.5%)", category: "dairy", per100g: { kcal: 52, protein: 2.8, fat: 2.5, carbs: 4.7 }, portions: [{ label: "Стакан (200мл)", weight: 200 }, { label: "Кухоль (250мл)", weight: 250 }] },
  { id: 13, name: "Сир твердий", category: "dairy", per100g: { kcal: 380, protein: 23, fat: 31, carbs: 1 }, portions: [{ label: "Скибочка (30г)", weight: 30 }, { label: "Середня (50г)", weight: 50 }] },

  // Complex Carbs
  { id: 20, name: "Вівсянка (суха)", category: "carbs", per100g: { kcal: 367, protein: 13, fat: 7, carbs: 66 }, portions: [{ label: "Мала (50г)", weight: 50 }, { label: "Середня (80г)", weight: 80 }, { label: "Велика (100г)", weight: 100 }] },
  { id: 21, name: "Гречка (варена)", category: "carbs", per100g: { kcal: 110, protein: 4, fat: 1, carbs: 22 }, portions: [{ label: "Мала (150г)", weight: 150 }, { label: "Середня (200г)", weight: 200 }, { label: "Велика (250г)", weight: 250 }] },
  { id: 22, name: "Бурий рис (варений)", category: "carbs", per100g: { kcal: 123, protein: 2.7, fat: 1, carbs: 26 }, portions: [{ label: "Мала (150г)", weight: 150 }, { label: "Середня (200г)", weight: 200 }, { label: "Велика (250г)", weight: 250 }] },
  { id: 23, name: "Цільнозерновий хліб", category: "carbs", per100g: { kcal: 247, protein: 9, fat: 3, carbs: 45 }, portions: [{ label: "Скибочка (30г)", weight: 30 }, { label: "2 скибочки (60г)", weight: 60 }] },
  { id: 24, name: "Картопля (запечена)", category: "carbs", per100g: { kcal: 93, protein: 2.5, fat: 0.1, carbs: 21 }, portions: [{ label: "Мала (150г)", weight: 150 }, { label: "Середня (200г)", weight: 200 }, { label: "Велика (300г)", weight: 300 }] },
  { id: 25, name: "Макарони з твердих сортів (варені)", category: "carbs", per100g: { kcal: 158, protein: 5.5, fat: 0.9, carbs: 31 }, portions: [{ label: "Мала (150г)", weight: 150 }, { label: "Середня (200г)", weight: 200 }] },
  { id: 26, name: "Перловка (варена)", category: "carbs", per100g: { kcal: 123, protein: 2.3, fat: 0.4, carbs: 28 }, portions: [{ label: "Середня (200г)", weight: 200 }] },

  // Vegetables
  { id: 30, name: "Броколі (свіжа/варена)", category: "vegetables", per100g: { kcal: 34, protein: 2.8, fat: 0.4, carbs: 7 }, portions: [{ label: "Мала (100г)", weight: 100 }, { label: "Середня (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }] },
  { id: 31, name: "Морква (сира)", category: "vegetables", per100g: { kcal: 41, protein: 0.9, fat: 0.2, carbs: 10 }, portions: [{ label: "Середня (80г)", weight: 80 }, { label: "2 шт (150г)", weight: 150 }] },
  { id: 32, name: "Огірок", category: "vegetables", per100g: { kcal: 15, protein: 0.7, fat: 0.1, carbs: 3.6 }, portions: [{ label: "Середній (120г)", weight: 120 }, { label: "Великий (200г)", weight: 200 }] },
  { id: 33, name: "Помідор", category: "vegetables", per100g: { kcal: 18, protein: 0.9, fat: 0.2, carbs: 3.9 }, portions: [{ label: "Середній (120г)", weight: 120 }, { label: "Великий (180г)", weight: 180 }] },
  { id: 34, name: "Болгарський перець", category: "vegetables", per100g: { kcal: 31, protein: 1, fat: 0.3, carbs: 6 }, portions: [{ label: "Середній (150г)", weight: 150 }] },
  { id: 35, name: "Капуста білокачанна", category: "vegetables", per100g: { kcal: 25, protein: 1.3, fat: 0.1, carbs: 6 }, portions: [{ label: "Порція (150г)", weight: 150 }, { label: "Велика (200г)", weight: 200 }] },
  { id: 36, name: "Шпинат", category: "vegetables", per100g: { kcal: 23, protein: 2.9, fat: 0.4, carbs: 3.6 }, portions: [{ label: "Жменя (50г)", weight: 50 }, { label: "Порція (100г)", weight: 100 }] },

  // Fruits
  { id: 40, name: "Яблуко", category: "fruits", per100g: { kcal: 52, protein: 0.3, fat: 0.2, carbs: 14 }, portions: [{ label: "Мале (130г)", weight: 130 }, { label: "Середнє (180г)", weight: 180 }, { label: "Велике (250г)", weight: 250 }] },
  { id: 41, name: "Банан", category: "fruits", per100g: { kcal: 89, protein: 1.1, fat: 0.3, carbs: 23 }, portions: [{ label: "Мале (100г)", weight: 100 }, { label: "Середнє (120г)", weight: 120 }] },
  { id: 42, name: "Груша", category: "fruits", per100g: { kcal: 57, protein: 0.4, fat: 0.1, carbs: 15 }, portions: [{ label: "Середня (160г)", weight: 160 }, { label: "Велика (200г)", weight: 200 }] },
  { id: 43, name: "Ягоди (полуниця/чорниця)", category: "fruits", per100g: { kcal: 40, protein: 0.7, fat: 0.4, carbs: 9 }, portions: [{ label: "Жменя (80г)", weight: 80 }, { label: "Чашка (150г)", weight: 150 }] },
  { id: 44, name: "Апельсин", category: "fruits", per100g: { kcal: 47, protein: 0.9, fat: 0.1, carbs: 12 }, portions: [{ label: "Середній (150г)", weight: 150 }, { label: "Великий (200г)", weight: 200 }] },

  // Fats
  { id: 50, name: "Авокадо", category: "fats", per100g: { kcal: 160, protein: 2, fat: 15, carbs: 9 }, portions: [{ label: "Половинка (75г)", weight: 75 }, { label: "Цілий (150г)", weight: 150 }] },
  { id: 51, name: "Оливкова олія", category: "fats", per100g: { kcal: 884, protein: 0, fat: 100, carbs: 0 }, portions: [{ label: "Чайна ложка (5г)", weight: 5 }, { label: "Столова ложка (14г)", weight: 14 }] },
  { id: 52, name: "Мигдаль", category: "fats", per100g: { kcal: 579, protein: 21, fat: 50, carbs: 22 }, portions: [{ label: "Жменя (30г)", weight: 30 }, { label: "Подвійна (50г)", weight: 50 }] },
  { id: 53, name: "Горіхи волоські", category: "fats", per100g: { kcal: 654, protein: 15, fat: 65, carbs: 14 }, portions: [{ label: "Жменя (30г)", weight: 30 }] },
  { id: 54, name: "Хумус", category: "fats", per100g: { kcal: 166, protein: 8, fat: 10, carbs: 14 }, portions: [{ label: "Ложка (30г)", weight: 30 }, { label: "Порція (60г)", weight: 60 }] },

  // Treats / Смаколики
  { id: 60, name: "Слабосолоний лосось", category: "treats", per100g: { kcal: 170, protein: 22, fat: 9, carbs: 0 }, portions: [{ label: "Кілька скибочок (60г)", weight: 60 }, { label: "Порція (100г)", weight: 100 }, { label: "Велика (150г)", weight: 150 }] },
  { id: 61, name: "Суші сет (власна порція)", category: "treats", per100g: { kcal: 150, protein: 6, fat: 3, carbs: 26 }, portions: [{ label: "Половина (450г на двох)", weight: 450 }, { label: "Ціла порція (900г)", weight: 900 }] },
  { id: 62, name: "McDonald's — Дабл Роял Чизбургер", category: "treats", per100g: { kcal: 267, protein: 17, fat: 15, carbs: 17 }, portions: [{ label: "1 бургер (~277г)", weight: 277 }] },
  { id: 63, name: "McDonald's — Сніданок подвійна свиняча з яйцем", category: "treats", per100g: { kcal: 231, protein: 14, fat: 12, carbs: 18 }, portions: [{ label: "1 сніданок (~234г)", weight: 234 }] },
  { id: 64, name: "McDonald's — Картопля фрі (велика)", category: "treats", per100g: { kcal: 312, protein: 3.8, fat: 15, carbs: 41 }, portions: [{ label: "Велика (154г)", weight: 154 }] },
];

export const MEAL_TYPES = [
  { id: "breakfast", label: "🌅 Сніданок" },
  { id: "lunch", label: "☀️ Обід" },
  { id: "dinner", label: "🌙 Вечеря" },
  { id: "snack", label: "🍎 Перекус" },
];

export const WORKOUT_TYPES = [
  { id: "walking", label: "🚶 Ходьба", kcalPerMin: 5 },
  { id: "cycling", label: "🚴 Велосипед", kcalPerMin: 8 },
  { id: "pool", label: "🏊 Басейн", kcalPerMin: 9 },
  { id: "home_strength", label: "💪 Домашнє силове", kcalPerMin: 6 },
  { id: "hiit", label: "⚡ HIIT", kcalPerMin: 12 },
];

export const DAILY_GOALS = {
  kcal: 1900,
  protein: 155,
  fat: 80,
  carbs: 180,
  steps: 8500,
  cardioMinPerWeek: 150,
  targetWeight: 89,
};

export function calcNutrition(food, weight) {
  const ratio = weight / 100;
  return {
    kcal: Math.round(food.per100g.kcal * ratio),
    protein: Math.round(food.per100g.protein * ratio * 10) / 10,
    fat: Math.round(food.per100g.fat * ratio * 10) / 10,
    carbs: Math.round(food.per100g.carbs * ratio * 10) / 10,
  };
}
