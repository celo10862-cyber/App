const CATALOG = [
  { name: "Qwen2.5 0.5B Instruct", type: "LLM · GGUF", size: "0.4 GB", source: "Hugging Face" },
  { name: "Llama 3.2 1B Instruct", type: "LLM · GGUF", size: "0.9 GB", source: "Hugging Face" },
  { name: "SD Turbo", type: "Image · safetensors", size: "2.1 GB", source: "Hugging Face" },
  { name: "Realistic Vision v6", type: "Image · safetensors", size: "2.0 GB", source: "CivitAI" },
];

export function Models() {
  return (
    <>
      <p className="eyebrow">Models</p>
      <h1 className="page-title">Model manager</h1>
      <p className="page-sub">
        Search and download from Hugging Face and CivitAI, with compatibility checked
        against this device's profile before you commit to a download.
      </p>

      <div className="panel">
        {CATALOG.map((m) => (
          <div
            key={m.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--fog)" }}>
                {m.type} · {m.size} · {m.source}
              </div>
            </div>
            <button className="btn secondary" disabled>Download</button>
          </div>
        ))}
      </div>
    </>
  );
}
