import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteData } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to background opacity and blur
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const blurAmount = useTransform(scrollY, [0, 100], [8, 12]);
  const scaleAmount = useTransform(scrollY, [0, 100], [1, 0.98]);

  const HEADER_H = 96; // h-24

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[120]"
        style={{
          background: 'linear-gradient(90deg, #689F38 0%, #8BC34A 50%, #AED581 100%)',
          scaleX: useTransform(scrollY, [0, document.body.scrollHeight - window.innerHeight], [0, 1]),
          transformOrigin: 'left'
        }}
      />
      
      <motion.header 
        className="backdrop-blur-sm shadow-lg border-b"
        style={{ 
          borderColor: '#8BC34A',
          backgroundColor: useTransform(scrollY, [0, 100], ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.98)']),
          backdropFilter: useTransform(scrollY, [0, 100], ['blur(8px)', 'blur(12px)'])
        }}
      >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="mr-4">
              <img 
                src="/assets/tronmebel-logo.png" 
                alt="Tron Mebel Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-wide" style={{ 
                background: `linear-gradient(135deg, #689F38 0%, #8BC34A 50%, #AED581 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {siteData.company.name}
              </h1>
              <p className="text-sm font-bold tracking-widest" style={{ color: '#689F38' }}>
                {siteData.company.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-2">
            {siteData.navigation.map((item) => {
              const hash = item.href.startsWith("#") ? item.href.slice(1) : item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToId(hash);
                    }
                  }}
                  className="text-lg font-black px-6 py-3 transition-all duration-300 relative group rounded-full transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ color: "#689F38", background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "linear-gradient(135deg, #689F38 0%, #8BC34A 100%)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#689F38";
                  }}
                >
                  {item.name}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full rounded-full"
                    style={{ background: "linear-gradient(135deg, #689F38 0%, #8BC34A 100%)" }}
                  />
                </a>
              );
            })}
          </div>
        </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-opacity-20"
              style={{ color: '#689F38' }}
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white/95 backdrop-blur-sm border-t" style={{ borderColor: '#8BC34A' }}>
              {siteData.navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-lg font-bold transition-all duration-300 rounded-lg transform hover:scale-105"
                  style={{ 
                    color: '#689F38',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#689F38';
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      </motion.header>
    </>
  );
}
