import { useState } from "react";

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

export default function ShoppingList({ nutrition }) {
  const [range, setRange] = useState("week");
  const [checked, setChecked] = useState({});

  const dates = range === "week"
    ? getWeekDates()
    : [new Date().toISOString().slice(0, 10)];

  // Aggregate all food entries
  const aggregated = {};
  dates.forEach((d) => {
    const day = nutrition[d];
    if (!day) return;
    Object.values(day).flat().forEach((item) => {
      const key = item.name;
      if (!aggregated[key]) aggregated[key] = { name: item.name, totalWeight: 0, count: 0, kcal: 0 };
      aggregated[key].totalWeight += item.weight;
      aggregated[key].count += 1;
      aggregated[key].kcal += item.kcal;
    });
  });

  const items = Object.values(aggregated).sort((a, b) => b.totalWeight - a.totalWeight);

  const toggle = (name) => setChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  const clearChecked = () => setChecked({});

  const copyToClipboard = () => {
    const text = items
      .filter((i) => !checked[i.name])
      .map((i) => `${i.name} — ~${Math.round(i.totalWeight / 100) * 100}г`)
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

      {items.length === 0 ? (
        <div className="card empty-state">
          <p>Спочатку заплануйте їжу в щоденнику — список покупок сформується автоматично.</p>
        </div>
      ) : (
        <>
          <div className="shopping-actions">
            <button className="btn-secondary" onClick={copyToClipboard}>📋 Копіювати</button>
            {Object.keys(checked).length > 0 && (
              <button className="btn-ghost" onClick={clearChecked}>Зняти відмітки</button>
            )}
          </div>
          <div className="card">
            {items.map((item) => (
              <div
                key={item.name}
                className={`shopping-item ${checked[item.name] ? "checked" : ""}`}
                onClick={() => toggle(item.name)}
              >
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
