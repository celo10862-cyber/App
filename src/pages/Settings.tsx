import { useState } from "react";

export function Settings() {
  const [mode, setMode] = useState<"beginner" | "advanced">("beginner");
  const [theme, setTheme] = useState<"dark" | "oled" | "light">("dark");

  return (
    <>
      <p className="eyebrow">Settings</p>
      <h1 className="page-title">Preferences</h1>
      <p className="page-sub">Everything here is stored only on this device.</p>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, margin: "0 0 12px" }}>Experience</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <button className={`btn ${mode === "beginner" ? "" : "secondary"}`} onClick={() => setMode("beginner")}>
            Beginner
          </button>
          <button className={`btn ${mode === "advanced" ? "" : "secondary"}`} onClick={() => setMode("advanced")}>
            Advanced
          </button>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, margin: "0 0 12px" }}>Theme</h3>
        <div style={{ display: "flex", gap: 10 }}>
          {(["dark", "oled", "light"] as const).map((t) => (
            <button key={t} className={`btn ${theme === t ? "" : "secondary"}`} onClick={() => setTheme(t)}>
              {t === "oled" ? "OLED dark" : t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
