import { useState, useEffect } from "react";
import { getNutritionForWeek } from "../lib/db";

function getWeekDates() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

export default function ShoppingList() {
  const [range, setRange] = useState("week");
  const [checked, setChecked] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const dates = range === "week"
          ? getWeekDates()
          : [new Date().toISOString().slice(0, 10)];
        const entries = await getNutritionForWeek(dates);
        const agg = {};
        entries.forEach((e) => {
          const key = e.food_name;
          if (!agg[key]) agg[key] = { name: e.food_name, totalWeight: 0, count: 0 };
          agg[key].totalWeight += e.weight;
          agg[key].count += 1;
        });
        setItems(Object.values(agg).sort((a, b) => b.totalWeight - a.totalWeight));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [range]);

  const toggle = (name) => setChecked((prev) => ({ ...prev, [name]: !prev[name] }));

  const copyToClipboard = () => {
    const text = items
      .filter((i) => !checked[i.name])
      .map((i) => `${i.name} — ~${Math.ceil(i.totalWeight / 50) * 50}г`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="shopping-list">
      <div className="shopping-header">
        <h3>🛒 Список покупок</h3>
        <div className="range-tabs">
          <button className={`range-tab ${range === "today" ? "active" : ""}`} onClick={() => setRange("today")}>Сьогодні</button>
          <button className={`range-tab ${range === "week" ? "active" : ""}`} onClick={() => setRange("week")}>Цей тиждень</button>
        </div>
      </div>

      {loading ? (
        <div className="card loading-state">Завантаження...</div>
      ) : items.length === 0 ? (
        <div className="card empty-state">
          <p>Спочатку заплануйте їжу в щоденнику — список покупок сформується автоматично.</p>
        </div>
      ) : (
        <>
          <div className="shopping-actions">
            <button className="btn-secondary" onClick={copyToClipboard}>📋 Копіювати</button>
            {Object.keys(checked).length > 0 && (
              <button className="btn-ghost" onClick={() => setChecked({})}>Зняти відмітки</button>
            )}
          </div>
          <div className="card">
            {items.map((item) => (
              <div key={item.name} className={`shopping-item ${checked[item.name] ? "checked" : ""}`} onClick={() => toggle(item.name)}>
                <span className="check-box">{checked[item.name] ? "✓" : ""}</span>
                <div className="shopping-item-info">
                  <span className="shopping-item-name">{item.name}</span>
                  <span className="shopping-item-detail">~{Math.ceil(item.totalWeight / 50) * 50}г ({item.count}x)</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
