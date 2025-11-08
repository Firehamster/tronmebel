import React, { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  hotzoneHeight?: number;
  headerHeight?: number;
};

export default function StickyRevealFrame({
  children,
  hotzoneHeight = 6,
  headerHeight = 96, // хедъра е h-24 => 24*4
}: Props) {
  const [hotzoneHover, setHotzoneHover] = useState(false);
  const [headerHover, setHeaderHover] = useState(false);
  const [showOnScrollUp, setShowOnScrollUp] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScroll = useRef(0);
  const ticking = useRef(false);


  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = y - lastScroll.current;
          const shouldShow = y < headerHeight || delta < -4;
          const shouldHide = delta > 6;

          if (shouldShow) setShowOnScrollUp(true);
          else if (shouldHide) setShowOnScrollUp(false);

          lastScroll.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight]);

  const atTop = typeof window !== "undefined" ? window.scrollY < headerHeight : true;

  // да сме сигурни :D
  const visible = !mounted ? true : (hotzoneHover || headerHover || showOnScrollUp || atTop);

  return (
    <>
      {/* Hover hotzone */}
      <div
        className="fixed inset-x-0 top-0 z-[110]"
        style={{ height: hotzoneHeight }}
        onMouseEnter={() => setHotzoneHover(true)}
        onMouseLeave={() => setHotzoneHover(false)}
      />

      {/* Header container */}
      <div
        onMouseEnter={() => setHeaderHover(true)}
        onMouseLeave={() => setHeaderHover(false)}
        className={[
          "fixed inset-x-0 top-0 z-[100]",
          "transition-transform duration-200 will-change-transform",
          visible ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        {children}
      </div>

      {/* Spacer */}
      <div aria-hidden style={{ height: headerHeight }} />
    </>
  );
}
