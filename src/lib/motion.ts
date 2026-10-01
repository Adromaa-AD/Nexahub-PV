/**
 * Detects constrained devices/connections and marks the document so heavy
 * visual effects (blurred orbs, particles, long transitions) can be dialled
 * down in CSS. Call once from an effect on the client.
 */
export function applyLightMotion() {
  if (typeof window === "undefined") return;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };

  const slowNetwork =
    nav.connection?.saveData === true ||
    /(^|-)2g$|^slow-2g$/.test(nav.connection?.effectiveType ?? "");
  const weakDevice = (nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency ?? 8) <= 4;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (slowNetwork || weakDevice || reduced) {
    document.documentElement.dataset["motion"] = "lite";
  }
}
