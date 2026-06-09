export default function MacroBar({ label, value, goal, unit, color }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const over = value > goal;
  return (
    <div className="macro-bar">
      <div className="macro-bar-header">
        <span className="macro-label">{label}</span>
        <span className={`macro-value ${over ? "over" : ""}`}>
          {value}{unit} / {goal}{unit}
        </span>
      </div>
      <div className="macro-track">
        <div
          className="macro-fill"
          style={{ width: `${pct}%`, background: over ? "#ef4444" : color }}
        />
      </div>
    </div>
  );
}
