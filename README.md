# Pocket AI Studio (Web)

An offline-first AI creation app that runs entirely in the browser — chat with a
local LLM and (scaffolded) local image generation, no server, no account.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL in a WebGPU-capable browser (recent Chrome/Edge).

## Build for production

```bash
npm run build
npm run preview   # serve the built dist/ folder locally
```

`dist/` is fully static — you can host it on any static host (GitHub Pages,
Netlify, Vercel, S3, etc.) or open `dist/index.html` directly for local use.

## What's actually working vs scaffolded

- **Dashboard** — fully working. Detects CPU cores, device memory (where the
  browser reports it), and WebGPU support, and renders a live readiness dial.
- **Chat AI** — fully working. Uses `@mlc-ai/web-llm` to download and run a
  real quantized LLM (Qwen2.5 0.5B / Llama 3.2 1B / Phi-3.5 mini) client-side
  via WebGPU. First load downloads the model; the browser caches it after
  that, so later loads are offline.
- **Image AI, Models, Local Files, Gallery, Settings** — UI is fully built
  (mode switcher, beginner/advanced params, download list, folder scan,
  theme/mode toggles), but the actual generation/download/scan calls are
  stubbed. Wiring a real in-browser diffusion pipeline (e.g. `onnxruntime-web`
  or `diffusers.js` with a small SD checkpoint) is the natural next step —
  it's a heavier integration than LLM chat and deserves its own pass.

## Stack

Vite + React + TypeScript, react-router (hash routing so it works from a
plain `file://` or static host), `@mlc-ai/web-llm` for in-browser inference.
No backend.

## Android APK (built automatically by GitHub Actions)

This repo is already wrapped as a native Android project via Capacitor
(`android/`), and `.github/workflows/build-apk.yml` builds a real `.apk` on
every push to `main` — no local Android Studio/SDK install needed.

### 1. Push this to GitHub

```bash
cd pocket-ai-studio
git init
git add .
git commit -m "Pocket AI Studio: web app + Android wrapper + CI APK build"
git branch -M main
git remote add origin https://github.com/<your-username>/pocketai-apk.git
git push -u origin main
```

(Create the empty repo first at github.com/new, named `pocketai-apk` or
whatever you'd like — don't initialize it with a README so the push above
doesn't conflict.)

### 2. Watch it build

Go to the **Actions** tab on the repo. The `Build Android APK` workflow runs
automatically and:
- installs JDK 17, Node 20, and the Android SDK on a GitHub-hosted runner
- builds the web app, syncs it into the Android project via Capacitor
- runs `./gradlew assembleDebug` and `assembleRelease`
- uploads both APKs as workflow artifacts
- also attaches them to a new GitHub Release (tagged `build-<run number>`)

### 3. Get the APK

Either download it from the workflow run's **Artifacts** section, or from
**Releases** on the repo sidebar. `app-debug.apk` installs directly on any
Android device (enable "install unknown apps" for your browser/file manager).
`app-release-unsigned.apk` is unsigned — sign it with your own keystore
before distributing outside your own devices (Play Store requires a signed,
often App Bundle, release).

### Local Android build (optional)

If you do have Android Studio installed locally:

```bash
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

