import { useState } from "react";
import { MEAL_TEMPLATES, TEMPLATE_CATEGORIES } from "../data/mealTemplates";
import { FOODS, calcNutrition } from "../data/foodDatabase";

function templateTotals(template) {
  return template.items.reduce(
    (acc, item) => {
      const food = FOODS.find((f) => f.id === item.foodId);
      if (!food) return acc;
      const n = calcNutrition(food, item.weight);
      return {
        kcal: acc.kcal + n.kcal,
        protein: acc.protein + n.protein,
        fat: acc.fat + n.fat,
        carbs: acc.carbs + n.carbs,
      };
    },
    { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

export default function MealTemplateModal({ mealType, onAdd, onClose }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = MEAL_TEMPLATES.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
  );

  const handleAdd = (template) => {
    const entries = template.items.map((item) => {
      const food = FOODS.find((f) => f.id === item.foodId);
      if (!food) return null;
      const n = calcNutrition(food, item.weight);
      return { id: Date.now() + Math.random(), foodId: food.id, name: food.name, weight: item.weight, ...n };
    }).filter(Boolean);
    onAdd(entries);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal template-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>⚡ Готові прийоми</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        {/* Category filter */}
        <div className="cat-tabs">
          <button className={`cat-tab ${activeCategory === "all" ? "active" : ""}`} onClick={() => setActiveCategory("all")}>Всі</button>
          {Object.entries(TEMPLATE_CATEGORIES).map(([k, v]) => (
            <button
              key={k}
              className={`cat-tab ${activeCategory === k ? "active" : ""}`}
              style={activeCategory === k ? { background: v.color, color: "#fff", borderColor: v.color } : {}}
              onClick={() => setActiveCategory(k)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="template-list">
          {filtered.map((template) => {
            const totals = templateTotals(template);
            const cat = TEMPLATE_CATEGORIES[template.category];
            return (
              <div key={template.id} className="template-card" onClick={() => handleAdd(template)}>
                <div className="template-card-top">
                  <span className="template-emoji">{template.emoji}</span>
                  <div className="template-info">
                    <span className="template-name">{template.name}</span>
                    <span className="template-desc">{template.description}</span>
                  </div>
                  <span
                    className="template-badge"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    {cat.label.split(" ")[0]}
                  </span>
                </div>

                {/* Ingredient list */}
                <div className="template-ingredients">
                  {template.items.map((item) => {
                    const food = FOODS.find((f) => f.id === item.foodId);
                    return food ? (
                      <span key={item.foodId} className="ingredient-chip">{food.name.split(" (")[0]} {item.weight}г</span>
                    ) : null;
                  })}
                </div>

                {/* Totals */}
                <div className="template-totals">
                  <span className="tt-kcal">{totals.kcal} ккал</span>
                  <span>Б: {Math.round(totals.protein)}г</span>
                  <span>Ж: {Math.round(totals.fat)}г</span>
                  <span>В: {Math.round(totals.carbs)}г</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
