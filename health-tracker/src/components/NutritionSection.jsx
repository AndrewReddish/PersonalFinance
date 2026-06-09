import { useState, useEffect, useCallback } from "react";
import { MEAL_TYPES, DAILY_GOALS } from "../data/foodDatabase";
import { getNutritionForDate, addFoodEntry, removeFoodEntry } from "../lib/db";
import MacroBar from "./MacroBar";
import AddFoodModal from "./AddFoodModal";
import MealTemplateModal from "./MealTemplateModal";
import ShoppingList from "./ShoppingList";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(d) {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("uk-UA", { weekday: "short", day: "numeric", month: "short" });
}

const EMPTY_DAY = { breakfast: [], lunch: [], dinner: [], snack: [] };

export default function NutritionSection() {
  const [date, setDate] = useState(todayStr());
  const [dayData, setDayData] = useState(EMPTY_DAY);
  const [loading, setLoading] = useState(false);
  const [addingTo, setAddingTo] = useState(null);
  const [templateFor, setTemplateFor] = useState(null);
  const [view, setView] = useState("log");

  const loadDay = useCallback(async (d) => {
    setLoading(true);
    try {
      const data = await getNutritionForDate(d);
      setDayData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDay(date); }, [date, loadDay]);

  const totals = Object.values(dayData).flat().reduce(
    (acc, item) => ({
      kcal: acc.kcal + (item.kcal || 0),
      protein: acc.protein + (item.protein || 0),
      fat: acc.fat + (item.fat || 0),
      carbs: acc.carbs + (item.carbs || 0),
    }),
    { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  );

  const addFood = async (mealId, entry) => {
    const saved = await addFoodEntry(date, mealId, entry);
    setDayData((prev) => ({ ...prev, [mealId]: [...prev[mealId], saved] }));
  };

  const addTemplateEntries = async (mealId, entries) => {
    const saved = await Promise.all(entries.map((e) => addFoodEntry(date, mealId, e)));
    setDayData((prev) => ({ ...prev, [mealId]: [...prev[mealId], ...saved] }));
  };

  const removeFood = async (mealId, entryId) => {
    await removeFoodEntry(entryId);
    setDayData((prev) => ({ ...prev, [mealId]: prev[mealId].filter((e) => e.id !== entryId) }));
  };

  const changeDate = (delta) => {
    const d = new Date(date + "T12:00:00");
    d.setDate(d.getDate() + delta);
    setDate(d.toISOString().slice(0, 10));
  };

  return (
    <div className="section">
      <div className="section-tabs">
        <button className={`section-tab ${view === "log" ? "active" : ""}`} onClick={() => setView("log")}>📋 Щоденник</button>
        <button className={`section-tab ${view === "shopping" ? "active" : ""}`} onClick={() => setView("shopping")}>🛒 Список покупок</button>
      </div>

      {view === "log" && (
        <>
          <div className="date-nav">
            <button className="btn-icon" onClick={() => changeDate(-1)}>‹</button>
            <div className="date-center">
              <strong>{date === todayStr() ? "Сьогодні" : formatDate(date)}</strong>
              <span className="date-sub">{date}</span>
            </div>
            <button className="btn-icon" onClick={() => changeDate(1)}>›</button>
          </div>

          <div className="daily-totals card">
            <div className="totals-row">
              <div className="total-big">
                <span className="total-num">{totals.kcal}</span>
                <span className="total-unit">ккал</span>
              </div>
              <div className="total-remaining">
                <span className={totals.kcal > DAILY_GOALS.kcal ? "over-text" : "ok-text"}>
                  {totals.kcal > DAILY_GOALS.kcal
                    ? `+${totals.kcal - DAILY_GOALS.kcal} понад норму`
                    : `залишилось ${DAILY_GOALS.kcal - totals.kcal} ккал`}
                </span>
              </div>
            </div>
            <MacroBar label="Білки" value={Math.round(totals.protein)} goal={DAILY_GOALS.protein} unit="г" color="#3b82f6" />
            <MacroBar label="Жири" value={Math.round(totals.fat)} goal={DAILY_GOALS.fat} unit="г" color="#f59e0b" />
            <MacroBar label="Вуглеводи" value={Math.round(totals.carbs)} goal={DAILY_GOALS.carbs} unit="г" color="#10b981" />
          </div>

          {loading ? (
            <div className="loading-state card">Завантаження...</div>
          ) : (
            MEAL_TYPES.map((meal) => {
              const items = dayData[meal.id] || [];
              const mealTotals = items.reduce((a, i) => ({ kcal: a.kcal + i.kcal, protein: a.protein + i.protein }), { kcal: 0, protein: 0 });
              return (
                <div key={meal.id} className="meal-block card">
                  <div className="meal-header">
                    <span className="meal-title">{meal.label}</span>
                    {items.length > 0 && (
                      <span className="meal-stats">{mealTotals.kcal} ккал · {Math.round(mealTotals.protein)}г білку</span>
                    )}
                    <button className="btn-template" onClick={() => setTemplateFor(meal.id)}>⚡ Шаблон</button>
                    <button className="btn-add" onClick={() => setAddingTo(meal.id)}>+ Додати</button>
                  </div>
                  {items.length === 0 && <p className="meal-empty">Нічого не додано</p>}
                  {items.map((item) => (
                    <div key={item.id} className="food-entry">
                      <div className="food-entry-info">
                        <span className="food-entry-name">{item.name}</span>
                        <span className="food-entry-weight">{item.weight}г</span>
                      </div>
                      <div className="food-entry-macros">
                        <span>{item.kcal} ккал</span>
                        <span>Б: {item.protein}г</span>
                        <span>Ж: {item.fat}г</span>
                        <span>В: {item.carbs}г</span>
                      </div>
                      <button className="btn-remove" onClick={() => removeFood(meal.id, item.id)}>✕</button>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </>
      )}

      {view === "shopping" && <ShoppingList />}

      {addingTo && (
        <AddFoodModal
          mealType={MEAL_TYPES.find((m) => m.id === addingTo)?.label}
          onAdd={(entry) => addFood(addingTo, entry)}
          onClose={() => setAddingTo(null)}
        />
      )}

      {templateFor && (
        <MealTemplateModal
          mealType={MEAL_TYPES.find((m) => m.id === templateFor)?.label}
          onAdd={(entries) => addTemplateEntries(templateFor, entries)}
          onClose={() => setTemplateFor(null)}
        />
      )}
    </div>
  );
}
