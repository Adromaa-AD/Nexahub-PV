import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import themeAsset from "@/assets/on-your-dreams.mp3.asset.json";

const FADE_SECONDS = 0.9;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = new Audio(themeAsset.url);
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = 0;
    audioRef.current = audio;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const start = audio.volume;
    const startAt = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startAt) / (FADE_SECONDS * 1000));
      audio.volume = Math.min(1, Math.max(0, start + (target - start) * t));
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else onDone?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const effectiveVolume = muted ? 0 : volume;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0, () => audio.pause());
      setPlaying(false);
    } else {
      audio.volume = 0;
      void audio.play();
      fadeTo(effectiveVolume);
      setPlaying(true);
      setExpanded(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) fadeTo(effectiveVolume);
    else audio.volume = effectiveVolume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, muted]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 sm:right-6 sm:bottom-6 sm:left-auto sm:translate-x-0">
      <div className="glass-card premium-interaction animate-rise flex items-center gap-3 rounded-full py-2 pr-4 pl-3 shadow-[var(--shadow-float)] hover:shadow-[var(--shadow-glass-hover)]">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause theme song" : "Play theme song"}
          className="bg-aurora premium-interaction relative flex size-11 shrink-0 items-center justify-center rounded-full text-foreground hover:scale-105 hover:shadow-[var(--shadow-soft)] active:scale-95"
        >
          {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
          {playing && (
            <span className="animate-orbit pointer-events-none absolute inset-0 rounded-full">
              <span className="bg-pastel absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full" />
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex min-w-0 flex-col items-start text-left sm:pointer-events-none"
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide">
            <Music className={`text-muted-foreground size-3.5 ${playing ? "animate-float" : ""}`} />
            On Your Dreams
          </span>
          <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
            NEXA-ORBIT Theme
          </span>
        </button>

        <div
          className={`items-center gap-2 transition-all duration-500 ${
            expanded ? "flex" : "hidden sm:flex"
          }`}
        >
          <div
            onClick={seek}
            role="progressbar"
            aria-label="Song progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            className="bg-border/70 h-1 w-16 cursor-pointer overflow-hidden rounded-full sm:w-24"
          >
            <div
              className="bg-aurora h-full rounded-full transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => {
              setVolume(Number(e.target.value) / 100);
              setMuted(false);
            }}
            aria-label="Volume"
            className="accent-primary h-1 w-14 cursor-pointer sm:w-16"
          />
        </div>
      </div>
    </div>
  );
}
