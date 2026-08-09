import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "◧", end: true },
  { to: "/chat", label: "Chat AI", icon: "◔" },
  { to: "/image", label: "Image AI", icon: "◐" },
  { to: "/models", label: "Models", icon: "◑" },
  { to: "/files", label: "Local Files", icon: "◒" },
  { to: "/gallery", label: "Gallery", icon: "◓" },
  { to: "/settings", label: "Settings", icon: "◕" },
];

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="dot" />
        Pocket AI Studio
      </div>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span aria-hidden>{l.icon}</span>
          {l.label}
        </NavLink>
      ))}
      <div className="nav-foot">
        offline-first
        <br />
        no account · no cloud
      </div>
    </nav>
  );
}
