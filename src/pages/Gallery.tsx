export function Gallery() {
  return (
    <>
      <p className="eyebrow">Gallery</p>
      <h1 className="page-title">Your generations</h1>
      <p className="page-sub">Kept on this device, each with its full prompt and settings attached.</p>
      <div className="panel" style={{ textAlign: "center", padding: "48px 24px" }}>
        <p style={{ color: "var(--fog)", fontSize: 13.5, margin: 0 }}>
          Nothing here yet — images you generate will appear in this gallery.
        </p>
      </div>
    </>
  );
}
