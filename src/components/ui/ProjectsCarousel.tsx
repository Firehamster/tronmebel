import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Img = { src: string; title?: string };
type Props = { images: Img[]; height?: number };

function useSrcFallback(src: string) {
  const candidates = useMemo(() => {
    // Try common variants in order
    if (src.endsWith(".jpg")) {
      return [src, src.replace(".jpg", ".JPG"), src.replace(".jpg", ".jpeg"), src.replace(".jpg", ".png")];
    }
    if (src.endsWith(".JPG")) {
      return [src, src.replace(".JPG", ".jpg"), src.replace(".JPG", ".jpeg"), src.replace(".JPG", ".png")];
    }
    if (src.endsWith(".jpeg")) {
      return [src, src.replace(".jpeg", ".jpg"), src.replace(".jpeg", ".JPG"), src.replace(".jpeg", ".png")];
    }
    if (src.endsWith(".png")) {
      return [src, src.replace(".png", ".jpg"), src.replace(".png", ".JPG"), src.replace(".png", ".jpeg")];
    }
    // default: try as-is then .jpg
    return [src, `${src}.jpg`];
  }, [src]);

  const [idx, setIdx] = useState(0);
  const current = candidates[idx];
  const onError = useCallback(() => {
    setIdx((i) => (i + 1 < candidates.length ? i + 1 : i)); // stop at last
  }, [candidates.length]);

  const exhausted = idx >= candidates.length - 1; // no more fallbacks left
  return { current, onError, exhausted };
}

function ProjectsCarousel({ images, height = 520 }: Props) {
  const safe = useMemo(() => images.filter(Boolean), [images]);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = () => setIdx((i) => (i - 1 + safe.length) % safe.length);
  const next = () => setIdx((i) => (i + 1) % safe.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [safe.length]);

  if (!safe.length) return null;

  // brand-tinted backdrop behind stage
  return (
    <div className="w-full">
      {/* Stage wrapper */}
      <div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-emerald-700/10
                   bg-white/70 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur"
        style={{ height }}
      >
        {/* Title / index */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-3">
          <div className="rounded-md bg-neutral-900/60 px-2 py-1 text-xs font-semibold text-white">
            {(safe[idx]?.title ?? `Проект ${idx + 1}`) + ` • ${idx + 1}/${safe.length}`}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-neutral-50 hover:bg-white/10"
            onClick={() => setIdx(0)}
            title="Към първия"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Prev/Next */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="pointer-events-auto mx-2 rounded-full bg-neutral-900/30 text-white hover:bg-neutral-900/50"
            onClick={prev}
            aria-label="Предишна"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="pointer-events-auto mx-2 rounded-full bg-neutral-900/30 text-white hover:bg-neutral-900/50"
            onClick={next}
            aria-label="Следваща"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Main image: object-contain, with extension fallback */}
        <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
          <AnimatePresence initial={false} mode="wait">
            <StageImage key={safe[idx].src} src={safe[idx].src} title={safe[idx].title ?? `Проект ${idx + 1}`} onClick={() => setOpen(true)} />
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnails: wrapping grid, hide any that completely fail */}
      <div className="mt-4 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2">
          {safe.map((img, i) => (
            <Thumb key={img.src} src={img.src} active={i === idx} onClick={() => setIdx(i)} title={img.title ?? `Проект ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Full-screen lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(1400px,98vw)] p-0 overflow-hidden bg-black border-0">
          <div className="relative flex h-[min(90vh,900px)] items-center justify-center bg-black">
            {/* Close */}
            <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-end p-2">
              <Button
                size="icon"
                variant="ghost"
                className="pointer-events-auto z-50 text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Затвори"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Prev/Next */}
            <div className="absolute inset-y-0 left-0 z-40 flex items-center">
              <Button size="icon" variant="ghost" className="mx-2 rounded-full bg-white/10 text-white hover:bg-white/20" onClick={prev}>
                <ChevronLeft className="h-7 w-7" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 z-40 flex items-center">
              <Button size="icon" variant="ghost" className="mx-2 rounded-full bg-white/10 text-white hover:bg-white/20" onClick={next}>
                <ChevronRight className="h-7 w-7" />
              </Button>
            </div>

            <AnimatePresence initial={false} mode="wait">
              <LightboxImage key={safe[idx].src} src={safe[idx].src} title={safe[idx].title ?? `Проект ${idx + 1}`} />
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Stage image with extension fallback */
function StageImage({ src, title, onClick }: { src: string; title: string; onClick: () => void }) {
  const { current, onError } = useSrcFallback(src);
  return (
    <motion.img
      src={current}
      alt={title}
      className="max-h-[calc(100%-0px)] w-auto object-contain cursor-zoom-in"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      onError={onError}
      onClick={onClick}
      decoding="async"
      loading="eager"
    />
  );
}

/** Lightbox image with extension fallback */
function LightboxImage({ src, title }: { src: string; title: string }) {
  const { current, onError } = useSrcFallback(src);
  return (
    <motion.img
      src={current}
      alt={title}
      className="max-h-[86vh] w-auto select-none object-contain"
      initial={{ opacity: 0.6, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.6, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      onError={onError}
      decoding="async"
      loading="eager"
    />
  );
}

/** Thumbnail with extension fallback; hides itself if all fallbacks fail */
function Thumb({
  src,
  active,
  onClick,
  title,
}: {
  src: string;
  active: boolean;
  onClick: () => void;
  title: string;
}) {
  const { current, onError, exhausted } = useSrcFallback(src);
  if (exhausted && current !== src) {
    // no valid variant loaded → hide thumb entirely
  }
  return (
    <button
      onClick={onClick}
      className={`relative h-16 w-full overflow-hidden rounded-lg ring-2 transition
        ${active ? "ring-emerald-500" : "ring-black/10 hover:ring-emerald-300"}`}
      aria-label={title}
      title={title}
    >
      <img
        src={current}
        alt={title}
        className="h-full w-full object-cover"
        onError={onError}
        loading="lazy"
        decoding="async"
      />
    </button>
  );
}
export default ProjectsCarousel;