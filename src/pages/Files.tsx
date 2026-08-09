export function Files() {
  return (
    <>
      <p className="eyebrow">Local Files</p>
      <h1 className="page-title">Scan for models</h1>
      <p className="page-sub">
        Look for .gguf, .safetensors, .onnx and similar files already on this device.
      </p>
      <div className="panel" style={{ textAlign: "center", padding: "48px 24px" }}>
        <p style={{ color: "var(--fog)", fontSize: 13.5, margin: "0 0 16px" }}>
          No folders scanned yet.
        </p>
        <button className="btn">Choose folder to scan</button>
      </div>
    </>
  );
}
