import { useEffect, useState } from "react";

export type DeviceProfile = {
  cores: number;
  ramGB: number | "unknown";
  webgpu: boolean;
  wasmThreads: boolean;
  tier: "ultra-low" | "low" | "balanced" | "performance";
  tierLabel: string;
  score: number; // 0-100, drives the dial
};

// Mirrors the app's device_profiles spec: 512MB / 2GB / 4GB / 8GB+ tiers.
function classify(ramGB: number | "unknown", cores: number, webgpu: boolean) {
  const effectiveRam = ramGB === "unknown" ? 4 : ramGB;

  let tier: DeviceProfile["tier"] = "balanced";
  let tierLabel = "Balanced";
  if (effectiveRam <= 1) {
    tier = "ultra-low";
    tierLabel = "Ultra low memory";
  } else if (effectiveRam <= 3) {
    tier = "low";
    tierLabel = "Low memory";
  } else if (effectiveRam <= 6) {
    tier = "balanced";
    tierLabel = "Balanced";
  } else {
    tier = "performance";
    tierLabel = "Performance";
  }

  // Composite score just for the dial - weights RAM heaviest, then GPU, then cores.
  const ramScore = Math.min(effectiveRam / 12, 1) * 55;
  const gpuScore = webgpu ? 30 : 8;
  const coreScore = Math.min(cores / 8, 1) * 15;
  const score = Math.round(ramScore + gpuScore + coreScore);

  return { tier, tierLabel, score: Math.min(score, 100) };
}

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const ramGB = (navigator as any).deviceMemory ?? "unknown";
    const { tier, tierLabel, score } = classify(ramGB, cores, false);
    return {
      cores,
      ramGB,
      webgpu: false,
      wasmThreads: typeof SharedArrayBuffer !== "undefined",
      tier,
      tierLabel,
      score,
    };
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const gpu = (navigator as any).gpu;
      let webgpu = false;
      if (gpu) {
        try {
          const adapter = await gpu.requestAdapter();
          webgpu = !!adapter;
        } catch {
          webgpu = false;
        }
      }
      if (cancelled) return;
      setProfile((prev) => {
        const { tier, tierLabel, score } = classify(prev.ramGB, prev.cores, webgpu);
        return { ...prev, webgpu, tier, tierLabel, score };
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return profile;
}
