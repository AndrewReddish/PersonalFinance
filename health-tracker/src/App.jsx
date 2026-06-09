import { useState } from "react";
import NutritionSection from "./components/NutritionSection";
import ActivitySection from "./components/ActivitySection";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("nutrition");

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🥦</span>
            <div>
              <span className="logo-title">harchi tracker</span>
              <span className="logo-sub">99 → 89 кг</span>
            </div>
          </div>
          <nav className="main-nav">
            <button
              className={`nav-btn ${tab === "nutrition" ? "active" : ""}`}
              onClick={() => setTab("nutrition")}
            >
              🍽️ Харчування
            </button>
            <button
              className={`nav-btn ${tab === "activity" ? "active" : ""}`}
              onClick={() => setTab("activity")}
            >
              💪 Активність
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {tab === "nutrition" ? <NutritionSection /> : <ActivitySection />}
      </main>
    </div>
  );
}
