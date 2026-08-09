import { HashRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";
import { ImageAI } from "./pages/ImageAI";
import { Models } from "./pages/Models";
import { Files } from "./pages/Files";
import { Gallery } from "./pages/Gallery";
import { Settings } from "./pages/Settings";
import "./App.css";

export default function App() {
  return (
    <HashRouter>
      <div className="shell">
        <Nav />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/image" element={<ImageAI />} />
            <Route path="/models" element={<Models />} />
            <Route path="/files" element={<Files />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
