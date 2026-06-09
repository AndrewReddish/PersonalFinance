import { useState, useEffect } from "react";
import NutritionSection from "./components/NutritionSection";
import ActivitySection from "./components/ActivitySection";
import LoginPage from "./components/LoginPage";
import { supabase } from "./lib/supabase";
import { signOut } from "./lib/auth";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("nutrition");
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="app-loading">Завантаження...</div>;
  }

  if (!session) {
    return <LoginPage />;
  }

  const username = session.user.email?.replace("@harchi.local", "") || "user";

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
            <button className={`nav-btn ${tab === "nutrition" ? "active" : ""}`} onClick={() => setTab("nutrition")}>
              🍽️ Харчування
            </button>
            <button className={`nav-btn ${tab === "activity" ? "active" : ""}`} onClick={() => setTab("activity")}>
              💪 Активність
            </button>
          </nav>
          <button className="logout-btn" onClick={signOut} title={`Вийти (${username})`}>
            👤 {username}
          </button>
        </div>
      </header>

      <main className="app-main">
        {tab === "nutrition" ? <NutritionSection /> : <ActivitySection />}
      </main>
    </div>
  );
}
