import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos(): boolean {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function InstallAppButton({ className = "" }: { className?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      setShowHelp(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const handleClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        return;
      }
    }
    // Fallback: no native prompt available — show instructions.
    setShowHelp((v) => !v);
  };

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className="bg-aurora premium-interaction inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-medium text-foreground shadow-[var(--shadow-float)] hover:-translate-y-1 hover:shadow-[var(--shadow-glass-hover)] hover:brightness-[1.03] active:translate-y-0 active:scale-[0.97] sm:min-h-11 sm:px-5 sm:text-sm"
        aria-label="Install the NEXA-ORBIT app"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Install App
      </button>
      {showHelp && (
        <span
          role="status"
          className="glass-card absolute top-full right-0 z-50 mt-3 block w-[min(16rem,calc(100vw-2rem))] rounded-2xl p-4 pr-10 text-left text-xs leading-relaxed text-foreground/80 shadow-lg"
        >
          {isIos()
            ? "To install: tap the Share button in Safari, then choose “Add to Home Screen”."
            : "To install: open your browser menu and choose “Install app” or “Add to Home Screen”."}
          <button
            type="button"
            onClick={() => setShowHelp(false)}
            className="premium-interaction absolute top-2 right-2 flex size-8 items-center justify-center rounded-full hover:bg-accent"
            aria-label="Close install instructions"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </span>
      )}
    </span>
  );
}
