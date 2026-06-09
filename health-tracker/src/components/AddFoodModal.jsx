import { useState } from "react";
import { FOODS, FOOD_CATEGORIES, calcNutrition } from "../data/foodDatabase";

export default function AddFoodModal({ mealType, onAdd, onClose }) {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [customWeight, setCustomWeight] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = FOODS.filter((f) => {
    const matchCat = tab === "all" || f.category === tab;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const effectiveWeight = selectedPortion
    ? selectedPortion.weight
    : customWeight
    ? parseInt(customWeight)
    : null;

  const preview = selectedFood && effectiveWeight
    ? calcNutrition(selectedFood, effectiveWeight)
    : null;

  const handleAdd = () => {
    if (!selectedFood || !effectiveWeight) return;
    const nutrition = calcNutrition(selectedFood, effectiveWeight);
    onAdd({
      id: Date.now(),
      foodId: selectedFood.id,
      name: selectedFood.name,
      weight: effectiveWeight,
      ...nutrition,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Додати продукт</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        <input
          className="search-input"
          placeholder="Пошук продукту..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelectedFood(null); }}
          autoFocus
        />

        <div className="cat-tabs">
          <button className={`cat-tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>Всі</button>
          {Object.entries(FOOD_CATEGORIES).map(([k, v]) => (
            <button key={k} className={`cat-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{v}</button>
          ))}
        </div>

        {!selectedFood ? (
          <div className="food-list">
            {filtered.map((food) => (
              <div key={food.id} className="food-item" onClick={() => { setSelectedFood(food); setSelectedPortion(food.portions[1] || food.portions[0]); setCustomWeight(""); }}>
                <span className="food-name">{food.name}</span>
                <span className="food-macro-hint">{food.per100g.kcal} ккал · {food.per100g.protein}г білку / 100г</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="portion-picker">
            <button className="btn-back" onClick={() => { setSelectedFood(null); setSelectedPortion(null); }}>← Назад</button>
            <h4>{selectedFood.name}</h4>

            <p className="section-label">Стандартні порції:</p>
            <div className="portion-list">
              {selectedFood.portions.map((p) => (
                <button
                  key={p.label}
                  className={`portion-btn ${selectedPortion?.label === p.label ? "active" : ""}`}
                  onClick={() => { setSelectedPortion(p); setCustomWeight(""); }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <p className="section-label">або вкажіть вагу вручну:</p>
            <div className="custom-weight">
              <input
                type="number"
                className="weight-input"
                placeholder="грамів"
                value={customWeight}
                onChange={(e) => { setCustomWeight(e.target.value); setSelectedPortion(null); }}
              />
              <span>г</span>
            </div>

            {preview && (
              <div className="nutrition-preview">
                <div className="preview-item"><span>Калорії</span><strong>{preview.kcal} ккал</strong></div>
                <div className="preview-item"><span>Білки</span><strong>{preview.protein}г</strong></div>
                <div className="preview-item"><span>Жири</span><strong>{preview.fat}г</strong></div>
                <div className="preview-item"><span>Вугл.</span><strong>{preview.carbs}г</strong></div>
              </div>
            )}

            <button className="btn-primary" onClick={handleAdd} disabled={!effectiveWeight}>
              Додати до {mealType}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
