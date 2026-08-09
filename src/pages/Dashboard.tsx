import { Link } from "react-router-dom";
import { useDeviceProfile } from "../hooks/useDeviceProfile";
import { CapabilityDial } from "../components/CapabilityDial";

const modules = [
  {
    to: "/chat",
    icon: "◔",
    title: "Chat AI",
    desc: "Talk to a local language model. Writing, code, questions — nothing leaves this tab.",
    tag: "GGUF · Llama · Qwen · Phi",
  },
  {
    to: "/image",
    icon: "◐",
    title: "Image AI",
    desc: "Text-to-image, inpainting, upscaling, and more — run on your own hardware.",
    tag: "SD checkpoints · LoRA · ControlNet",
  },
  {
    to: "/models",
    icon: "◑",
    title: "Models",
    desc: "Browse, download, and manage models from Hugging Face and CivitAI.",
    tag: "Search · Resume · Verify",
  },
  {
    to: "/files",
    icon: "◒",
    title: "Local Files",
    desc: "Scan storage for models you already have — internal, downloads, SD card.",
    tag: "Auto-detect",
  },
  {
    to: "/gallery",
    icon: "◓",
    title: "Gallery",
    desc: "Every image you've generated, kept on-device with its full generation recipe.",
    tag: "Local only",
  },
  {
    to: "/settings",
    icon: "◕",
    title: "Settings",
    desc: "Theme, beginner/advanced mode, and hardware overrides.",
    tag: "Beginner · Advanced",
  },
];

export function Dashboard() {
  const profile = useDeviceProfile();

  return (
    <>
      <p className="eyebrow">Device readiness</p>
      <h1 className="page-title">Everything runs here.</h1>
      <p className="page-sub">
        No sign-in, no server, no upload. Pocket AI Studio profiles your hardware
        the moment it loads and quietly tunes itself to it.
      </p>

      <section className="hero">
        <div className="dial-wrap">
          <CapabilityDial score={profile.score} label={profile.tierLabel} />
        </div>
        <div className="hero-copy">
          <h2>Tuned for this device: {profile.tierLabel.toLowerCase()} mode</h2>
          <p>
            Based on what this browser can see, Pocket AI Studio has picked a
            starting configuration. You can override it any time in Settings.
          </p>
          <div className="readouts">
            <div className="readout">
              <span className="rlabel">CPU cores</span>
              <span className="rvalue">{profile.cores}</span>
            </div>
            <div className="readout">
              <span className="rlabel">Memory</span>
              <span className="rvalue">
                {profile.ramGB === "unknown" ? "not reported" : `${profile.ramGB} GB+`}
              </span>
            </div>
            <div className="readout">
              <span className="rlabel">WebGPU</span>
              <span className={`rvalue ${profile.webgpu ? "" : "amber"}`}>
                {profile.webgpu ? "available" : "unavailable — CPU fallback"}
              </span>
            </div>
            <div className="readout">
              <span className="rlabel">Threaded WASM</span>
              <span className={`rvalue ${profile.wasmThreads ? "" : "amber"}`}>
                {profile.wasmThreads ? "enabled" : "disabled"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <p className="eyebrow">Modules</p>
      <div className="grid">
        {modules.map((m) => (
          <Link key={m.to} to={m.to} className="card">
            <div className="card-icon" aria-hidden>{m.icon}</div>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
            <span className="tag">{m.tag}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
