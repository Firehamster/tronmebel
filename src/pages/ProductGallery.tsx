// src/components/ui/ProjectsGallery.tsx
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

type Img = { src: string; title?: string };
type Props = {
  images: Img[];
  cols?: { base?: 2 | 3 | 4; md?: 2 | 3 | 4 | 5; lg?: 3 | 4 | 5 | 6 };
};

const classFor = (prefix: "grid-cols" | "sm:grid-cols" | "lg:grid-cols", n: number) => {
  // explicit static classes so Tailwind picks them up
  const map: Record<number, string> = {
    2: `${prefix}-2`,
    3: `${prefix}-3`,
    4: `${prefix}-4`,
    5: `${prefix}-5`,
    6: `${prefix}-6`,
  };
  return map[n] ?? `${prefix}-3`;
};

export default function ProjectsGallery({
  images,
  cols = { base: 2, md: 3, lg: 4 },
}: Props) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <div
        className={[
          "grid gap-4",
          classFor("grid-cols", cols.base ?? 2),
          classFor("sm:grid-cols", cols.md ?? 3),
          classFor("lg:grid-cols", cols.lg ?? 4),
        ].join(" ")}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none"
            onClick={() => { setIdx(i); setOpen(true); }}
          >
            <img
              src={img.src}
              alt={img.title ?? `Проект ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
              <div className="rounded-md bg-black/50 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {img.title ?? `Проект ${i + 1}`}
              </div>
              <div className="rounded-full bg-white/80 p-1 backdrop-blur-sm">
                <ZoomIn className="h-4 w-4 text-neutral-800" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(1100px,95vw)] p-0 overflow-hidden bg-black/90 border-0">
          <div className="relative flex items-center justify-center">
            <motion.img
              key={images[idx]?.src}
              src={images[idx]?.src}
              alt={images[idx]?.title ?? `Проект ${idx + 1}`}
              className="max-h-[82vh] w-auto object-contain select-none"
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            />
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-3">
              <div className="rounded-md bg-black/50 px-2 py-1 text-xs font-semibold text-white">
                {images[idx]?.title ?? `Проект ${idx + 1}`} • {idx + 1}/{images.length}
              </div>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                size="icon"
                variant="ghost"
                className="mx-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                size="icon"
                variant="ghost"
                className="mx-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={() => setIdx((i) => (i + 1) % images.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
