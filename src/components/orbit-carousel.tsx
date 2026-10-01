import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITES, SiteCard } from "./site-card";

export default function OrbitCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <>
      <div
        className="overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="NEXA-ORBIT worlds"
        tabIndex={0}
      >
        <div className="flex touch-pan-y">
          {SITES.map((site, i) => (
            <div
              key={site.name}
              className="min-w-0 shrink-0 grow-0 basis-[88%] px-2 py-3 sm:basis-[58%] lg:basis-[38%] xl:basis-[32%]"
            >
              <SiteCard site={site} active={i === selected} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={prev}
          aria-label="Previous website"
          className="glass-card premium-interaction size-12 rounded-full hover:-translate-y-1 hover:bg-accent/50 hover:shadow-[var(--shadow-glass-hover)] active:translate-y-0 active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex items-center gap-2.5">
          {SITES.map((site, i) => (
            <Button
              key={site.name}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Go to ${site.name}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`premium-interaction h-2.5 min-h-2.5 rounded-full p-0 ${
                i === selected ? "bg-aurora w-8" : "w-2.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={next}
          aria-label="Next website"
          className="glass-card premium-interaction size-12 rounded-full hover:-translate-y-1 hover:bg-accent/50 hover:shadow-[var(--shadow-glass-hover)] active:translate-y-0 active:scale-95"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </>
  );
}
