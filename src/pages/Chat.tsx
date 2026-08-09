import { useEffect, useRef, useState } from "react";
import * as webllm from "@mlc-ai/web-llm";

type Msg = { role: "user" | "assistant" | "system"; content: string };

// Small, WebGPU-friendly models. Larger ones are listed but will be slow/heavy
// on low-end devices - this is exactly what the device profile on the
// Dashboard is meant to warn people about before they pick one.
const MODEL_OPTIONS = [
  { id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC", label: "Qwen2.5 0.5B (fastest, ~380MB)" },
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", label: "Llama 3.2 1B (~880MB)" },
  { id: "Phi-3.5-mini-instruct-q4f16_1-MLC", label: "Phi 3.5 mini (~2.4GB)" },
];

export function Chat() {
  const [modelId, setModelId] = useState(MODEL_OPTIONS[0].id);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadText, setLoadText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "system", content: "Model not loaded yet. Choose a model and tap Load to begin — it downloads once and is cached by the browser after that." },
  ]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const engineRef = useRef<webllm.MLCEngine | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function loadModel() {
    setStatus("loading");
    setLoadProgress(0);
    setMessages((m) => [...m, { role: "system", content: `Loading ${modelId}…` }]);
    try {
      const engine = new webllm.MLCEngine();
      engine.setInitProgressCallback((report) => {
        setLoadProgress(Math.round(report.progress * 100));
        setLoadText(report.text);
      });
      await engine.reload(modelId);
      engineRef.current = engine;
      setStatus("ready");
      setMessages((m) => [...m, { role: "system", content: "Model ready. Running entirely on this device." }]);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessages((m) => [
        ...m,
        {
          role: "system",
          content:
            "Couldn't load the model. This browser may not support WebGPU, or the device is out of memory. Try a smaller model.",
        },
      ]);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || !engineRef.current || generating) return;
    setInput("");
    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setGenerating(true);

    try {
      const chatHistory = nextMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      const stream = await engineRef.current.chat.completions.create({
        messages: chatHistory as any,
        stream: true,
      });

      let assistantText = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content ?? "";
        assistantText += delta;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: assistantText };
          return copy;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "system", content: "Generation failed. See console for details." }]);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <p className="eyebrow">Chat AI</p>
      <h1 className="page-title">Local assistant</h1>
      <p className="page-sub">
        Runs fully in this browser tab via WebGPU. First load downloads the model once;
        after that it's cached and works offline.
      </p>

      <div className="panel" style={{ marginBottom: 20, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <select
          className="model-select"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          disabled={status === "loading"}
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
        <button className="btn" onClick={loadModel} disabled={status === "loading"}>
          {status === "ready" ? "Reload model" : status === "loading" ? "Loading…" : "Load model"}
        </button>
        {status === "loading" && (
          <div style={{ flex: 1, minWidth: 160 }}>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${loadProgress}%` }} />
            </div>
            <span className="mono" style={{ fontSize: 11, color: "var(--fog)" }}>{loadText}</span>
          </div>
        )}
      </div>

      <div className="chat-shell panel">
        <div className="chat-log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>{m.content}</div>
          ))}
        </div>
        <div className="chat-input-row">
          <textarea
            rows={2}
            placeholder={status === "ready" ? "Message the model…" : "Load a model first"}
            value={input}
            disabled={status !== "ready" || generating}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button className="btn" onClick={send} disabled={status !== "ready" || generating}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
