import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { WORKOUT_TYPES, DAILY_GOALS } from "../data/foodDatabase";
import {
  getActivityForDate, upsertActivityDay,
  addWorkout, removeWorkout,
  getActivityHistory, getWeekCardioMinutes,
} from "../lib/db";

function todayStr() { return new Date().toISOString().slice(0, 10); }
function formatDate(d) {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("uk-UA", { day: "numeric", month: "short" });
}

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

function CircleProgress({ value, goal, label, unit, color }) {
  const pct = Math.min(1, value / goal);
  const r = 42, circ = 2 * Math.PI * r, dash = pct * circ;
  return (
    <div className="circle-progress">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={value >= goal ? "#10b981" : color}
          strokeWidth="10" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 50 50)" style={{ transition: "stroke-dasharray .4s ease" }} />
        <text x="50" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#111827">{value}</text>
        <text x="50" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">{unit}</text>
      </svg>
      <span className="circle-label">{label}</span>
      <span className="circle-goal">ціль: {goal}</span>
    </div>
  );
}

export default function ActivitySection() {
  const [date, setDate] = useState(todayStr());
  const [dayData, setDayData] = useState({ steps: 0, weight: null, workouts: [] });
  const [weekCardioMin, setWeekCardioMin] = useState(0);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [workoutType, setWorkoutType] = useState("walking");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [stepsInput, setStepsInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [view, setView] = useState("today");

  const loadDay = useCallback(async (d) => {
    setLoading(true);
    try {
      const data = await getActivityForDate(d);
      setDayData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWeekCardio = useCallback(async () => {
    const min = await getWeekCardioMinutes(getWeekDates());
    setWeekCardioMin(min);
  }, []);

  const loadHistory = useCallback(async () => {
    const h = await getActivityHistory(14);
    setHistory(h);
  }, []);

  useEffect(() => { loadDay(date); }, [date, loadDay]);
  useEffect(() => { loadWeekCardio(); }, [loadWeekCardio]);
  useEffect(() => { if (view === "history") loadHistory(); }, [view, loadHistory]);

  const changeDate = (delta) => {
    const d = new Date(date + "T12:00:00");
    d.setDate(d.getDate() + delta);
    setDate(d.toISOString().slice(0, 10));
  };

  const saveSteps = async () => {
    if (!stepsInput) return;
    const steps = parseInt(stepsInput);
    await upsertActivityDay(date, { steps });
    setDayData((prev) => ({ ...prev, steps }));
    setStepsInput("");
    loadWeekCardio();
  };

  const saveWeight = async () => {
    if (!weightInput) return;
    const weight = parseFloat(weightInput);
    await upsertActivityDay(date, { weight });
    setDayData((prev) => ({ ...prev, weight }));
    setWeightInput("");
  };

  const handleAddWorkout = async () => {
    if (!workoutDuration) return;
    const wt = WORKOUT_TYPES.find((w) => w.id === workoutType);
    const duration = parseInt(workoutDuration);
    const kcalBurned = Math.round(wt.kcalPerMin * duration);
    const newWorkout = await addWorkout(date, { type: workoutType, label: wt.label, duration, kcalBurned });
    setDayData((prev) => ({ ...prev, workouts: [...prev.workouts, newWorkout] }));
    setWorkoutDuration("");
    setShowAddWorkout(false);
    loadWeekCardio();
  };

  const handleRemoveWorkout = async (id) => {
    await removeWorkout(id);
    setDayData((prev) => ({ ...prev, workouts: prev.workouts.filter((w) => w.id !== id) }));
    loadWeekCardio();
  };

  const totalWorkoutKcal = dayData.workouts.reduce((s, w) => s + w.kcalBurned, 0);
  const weekDates = getWeekDates();

  const weightChartData = Object.entries(history)
    .filter(([, d]) => d.weight)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([d, data]) => ({ date: formatDate(d), weight: data.weight }));

  return (
    <div className="section">
      <div className="section-tabs">
        <button className={`section-tab ${view === "today" ? "active" : ""}`} onClick={() => setView("today")}>📊 Сьогодні</button>
        <button className={`section-tab ${view === "history" ? "active" : ""}`} onClick={() => setView("history")}>📈 Прогрес ваги</button>
      </div>

      {view === "today" && (
        <>
          <div className="date-nav">
            <button className="btn-icon" onClick={() => changeDate(-1)}>‹</button>
            <div className="date-center">
              <strong>{date === todayStr() ? "Сьогодні" : formatDate(date)}</strong>
              <span className="date-sub">{date}</span>
            </div>
            <button className="btn-icon" onClick={() => changeDate(1)}>›</button>
          </div>

          <div className="card circles-row">
            <CircleProgress value={dayData.steps || 0} goal={DAILY_GOALS.steps} label="Кроки" unit="кроків" color="#3b82f6" />
            <CircleProgress value={weekCardioMin} goal={DAILY_GOALS.cardioMinPerWeek} label="Кардіо/тиждень" unit="хв" color="#f59e0b" />
            <CircleProgress value={totalWorkoutKcal} goal={400} label="Спалено" unit="ккал" color="#ef4444" />
          </div>

          {/* Steps */}
          <div className="card activity-block">
            <div className="activity-block-header">
              <span className="activity-title">🚶 Кроки за день</span>
              {dayData.steps > 0 && <span className="activity-value">{dayData.steps.toLocaleString()} кроків</span>}
            </div>
            <div className="input-row">
              <input type="number" className="weight-input" placeholder="Кількість кроків"
                value={stepsInput} onChange={(e) => setStepsInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveSteps()} />
              <button className="btn-primary-sm" onClick={saveSteps}>Зберегти</button>
            </div>
            {dayData.steps > 0 && (
              <div className="steps-bar-wrap">
                <div className="steps-bar">
                  <div className="steps-fill" style={{ width: `${Math.min(100, (dayData.steps / DAILY_GOALS.steps) * 100)}%` }} />
                </div>
                <span className="steps-pct">{Math.round((dayData.steps / DAILY_GOALS.steps) * 100)}%</span>
              </div>
            )}
          </div>

          {/* Weight */}
          <div className="card activity-block">
            <div className="activity-block-header">
              <span className="activity-title">⚖️ Вага тіла</span>
              {dayData.weight && <span className="activity-value">{dayData.weight} кг</span>}
            </div>
            <div className="input-row">
              <input type="number" step="0.1" className="weight-input" placeholder="кг (напр. 97.5)"
                value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveWeight()} />
              <button className="btn-primary-sm" onClick={saveWeight}>Зберегти</button>
            </div>
            {dayData.weight && (
              <p className="weight-to-go">
                {dayData.weight > DAILY_GOALS.targetWeight
                  ? `До цілі (${DAILY_GOALS.targetWeight} кг): ще ${(dayData.weight - DAILY_GOALS.targetWeight).toFixed(1)} кг`
                  : "🎉 Мету досягнуто!"}
              </p>
            )}
          </div>

          {/* Workouts */}
          <div className="card activity-block">
            <div className="activity-block-header">
              <span className="activity-title">💪 Тренування</span>
              <button className="btn-add" onClick={() => setShowAddWorkout(!showAddWorkout)}>+ Додати</button>
            </div>
            {showAddWorkout && (
              <div className="add-workout-form">
                <div className="workout-type-grid">
                  {WORKOUT_TYPES.map((w) => (
                    <button key={w.id} className={`workout-type-btn ${workoutType === w.id ? "active" : ""}`} onClick={() => setWorkoutType(w.id)}>
                      {w.label}
                    </button>
                  ))}
                </div>
                <div className="input-row">
                  <input type="number" className="weight-input" placeholder="Тривалість (хв)"
                    value={workoutDuration} onChange={(e) => setWorkoutDuration(e.target.value)} />
                  <button className="btn-primary-sm" onClick={handleAddWorkout}>Додати</button>
                </div>
                {workoutDuration && (
                  <p className="workout-preview">~{Math.round((WORKOUT_TYPES.find(w => w.id === workoutType)?.kcalPerMin || 6) * parseInt(workoutDuration))} ккал за {workoutDuration} хв</p>
                )}
              </div>
            )}
            {dayData.workouts.length === 0 && !showAddWorkout && <p className="meal-empty">Тренувань ще немає</p>}
            {dayData.workouts.map((w) => (
              <div key={w.id} className="workout-entry">
                <span className="workout-type">{w.label}</span>
                <span className="workout-dur">{w.duration} хв</span>
                <span className="workout-kcal">~{w.kcalBurned} ккал</span>
                <button className="btn-remove" onClick={() => handleRemoveWorkout(w.id)}>✕</button>
              </div>
            ))}
          </div>

          {/* Weekly cardio */}
          <div className="card activity-block">
            <div className="activity-block-header">
              <span className="activity-title">📅 Кардіо цього тижня</span>
              <span className="activity-value">{weekCardioMin} / {DAILY_GOALS.cardioMinPerWeek} хв</span>
            </div>
            <div className="steps-bar-wrap">
              <div className="steps-bar">
                <div className="steps-fill cardio-fill" style={{ width: `${Math.min(100, (weekCardioMin / DAILY_GOALS.cardioMinPerWeek) * 100)}%` }} />
              </div>
              <span className="steps-pct">{Math.round((weekCardioMin / DAILY_GOALS.cardioMinPerWeek) * 100)}%</span>
            </div>
            <div className="week-days">
              {weekDates.map((d) => {
                const dayMin = (history[d]?.workouts || []).reduce((s, w) => s + w.duration, 0);
                return (
                  <div key={d} className={`week-day ${d === date ? "current" : ""}`}>
                    <div className={`week-dot ${dayMin > 0 ? "active" : ""}`} />
                    <span>{new Date(d + "T12:00:00").toLocaleDateString("uk-UA", { weekday: "short" })}</span>
                    {dayMin > 0 && <span className="week-day-min">{dayMin}хв</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {view === "history" && (
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>📈 Динаміка ваги</h3>
          {weightChartData.length < 2 ? (
            <p className="meal-empty">Введіть вагу хоча б за 2 дні щоб побачити графік.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weightChartData}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} unit="кг" width={48} />
                <Tooltip formatter={(v) => [`${v} кг`, "Вага"]} />
                <ReferenceLine y={DAILY_GOALS.targetWeight} stroke="#10b981" strokeDasharray="4 2"
                  label={{ value: `Ціль ${DAILY_GOALS.targetWeight}кг`, position: "insideTopRight", fontSize: 11, fill: "#10b981" }} />
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}

          <h3 style={{ margin: "24px 0 12px" }}>📅 Щоденний лог</h3>
          <div className="history-list">
            {Object.entries(history)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([d, data]) => (
                <div key={d} className="history-row">
                  <span className="history-date">{formatDate(d)}</span>
                  <span className="history-steps">{data.steps ? `${data.steps.toLocaleString()} кр.` : "—"}</span>
                  <span className="history-weight">{data.weight ? `${data.weight} кг` : "—"}</span>
                  <span className="history-workouts">
                    {data.workouts?.length > 0 ? data.workouts.map((w) => `${w.label} ${w.duration}хв`).join(", ") : "—"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
