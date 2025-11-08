import React, { useEffect, useRef, useState } from "react";

// тоя тип може и да се смени
type NavItem = { name: string; href: string };

// подваме на siteData.navigation 
export default function StickyHoverHeader({
  navigation,
  brand = "ТРОН МЕБЕЛ",
}: {
  navigation: NavItem[];
  brand?: string;
}) {
  const [hotzoneHover, setHotzoneHover] = useState(false);
  const [headerHover, setHeaderHover] = useState(false);
  const [showOnScrollUp, setShowOnScrollUp] = useState(true);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  // показваме хедъра при скрол нагоре
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = y - lastScroll.current;
          // ако сме над 64px отгоре, винаги показваме
          const shouldShow = y < 64 || delta < -4; // нагоре с поне 4px
          const shouldHide = delta > 6; // надолу с поне 6px

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
  }, []);

  // виждаме хедъра ако сме в hover зона или сме скролнали нагоре
  const visible = hotzoneHover || headerHover || showOnScrollUp || (typeof window !== "undefined" && window.scrollY < 64);

  return (
    <>
      {/* Hotzone: малък бар който показва хедъра ако сме най-отгоре */}
      <div
        className="fixed inset-x-0 top-0 h-2 z-[60]"
        onMouseEnter={() => setHotzoneHover(true)}
        onMouseLeave={() => setHotzoneHover(false)}
      />

      {/* Хедър */}
      <header
        onMouseEnter={() => setHeaderHover(true)}
        onMouseLeave={() => setHeaderHover(false)}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-transform duration-200 will-change-transform",
          "backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:supports-[backdrop-filter]:bg-neutral-900/70",
          "border-b border-black/5 dark:border-white/10",
          visible ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="text-base font-semibold tracking-wide">
              {brand}
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile menu (very lightweight) */}
            <details className="relative md:hidden">
              <summary className="list-none cursor-pointer select-none rounded-xl px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5">
                Menu
              </summary>
              <div className="absolute right-0 mt-2 min-w-44 overflow-hidden rounded-xl border border-black/10 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/90">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>
      </header>

      {/* Спейсър */}
      <div aria-hidden className="h-16" />
    </>
  );
}

