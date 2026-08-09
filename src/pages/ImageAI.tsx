import { useState } from "react";

const MODES = [
  "Text to Image", "Image to Image", "Inpainting", "Outpainting",
  "Sketch to Image", "Upscale", "Background Removal",
];

const SAMPLERS = ["Euler A", "DPM++ 2M Karras", "DDIM", "UniPC"];

export function ImageAI() {
  const [mode, setMode] = useState(MODES[0]);
  const [advanced, setAdvanced] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [steps, setSteps] = useState(20);
  const [cfg, setCfg] = useState(7);
  const [sampler, setSampler] = useState(SAMPLERS[0]);
  const [seed, setSeed] = useState("");
  const [status] = useState<"idle" | "no-model">("no-model");

  return (
    <>
      <p className="eyebrow">Image AI</p>
      <h1 className="page-title">Generate</h1>
      <p className="page-sub">
        Text-to-image and editing tools that run against a checkpoint stored on this
        device. Nothing is uploaded.
      </p>

      <div className="panel" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`btn ${mode === m ? "" : "secondary"}`}
              style={{ fontSize: 12, padding: "7px 12px" }}
            >
              {m}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          placeholder="Describe the image you want…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            background: "var(--panel-raised)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            color: "var(--paper)",
            padding: "12px 14px",
            fontSize: 14,
            resize: "vertical",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0" }}>
          <label className="mono" style={{ fontSize: 11.5, color: "var(--fog)", display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={advanced} onChange={(e) => setAdvanced(e.target.checked)} />
            Advanced controls
          </label>
          <button className="btn" disabled>
            Generate
          </button>
        </div>

        {advanced && (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            <div>
              <span className="dial-label" style={{ display: "block", marginBottom: 6 }}>Sampler</span>
              <select className="model-select" value={sampler} onChange={(e) => setSampler(e.target.value)}>
                {SAMPLERS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <span className="dial-label" style={{ display: "block", marginBottom: 6 }}>Steps: {steps}</span>
              <input type="range" min={5} max={50} value={steps} onChange={(e) => setSteps(+e.target.value)} style={{ width: "100%" }} />
            </div>
            <div>
              <span className="dial-label" style={{ display: "block", marginBottom: 6 }}>CFG scale: {cfg}</span>
              <input type="range" min={1} max={20} value={cfg} onChange={(e) => setCfg(+e.target.value)} style={{ width: "100%" }} />
            </div>
            <div>
              <span className="dial-label" style={{ display: "block", marginBottom: 6 }}>Seed</span>
              <input
                className="model-select"
                style={{ width: "100%" }}
                placeholder="random"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {status === "no-model" && (
        <div className="panel" style={{ borderColor: "var(--amber)", background: "rgba(255,180,84,0.06)" }}>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--paper)" }}>
            <strong style={{ color: "var(--amber)" }}>No checkpoint loaded.</strong> Generate is disabled
            until a Stable Diffusion checkpoint is downloaded or added from Local Files. Head to{" "}
            <strong>Models</strong> to get one.
          </p>
        </div>
      )}
    </>
  );
}
