"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { brandAssets } from "@/data/brand-assets";
import { navItems } from "@/data/site-content";

const MENU_ID = "menu-principal";
const COMPACT_QUERY = "(max-width: 900px)";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Necesitamos saber si estamos en el layout compacto para poder marcar el
  // menu como inert cuando esta cerrado: opacity 0 + pointer-events none no lo
  // saca del orden de tabulacion.
  useEffect(() => {
    const media = window.matchMedia(COMPACT_QUERY);
    const sync = () => {
      setIsCompact(media.matches);

      if (!media.matches) {
        setIsOpen(false);
      }
    };

    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    navRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a
          className="brand-lockup"
          href="#top"
          aria-label="Digital Amenities, ir al inicio"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={brandAssets.headerPrimary.src}
            alt={brandAssets.headerPrimary.alt}
            width={2275}
            height={334}
            priority
          />
        </a>

        <button
          type="button"
          ref={toggleRef}
          className="mobile-menu-toggle"
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id={MENU_ID}
          ref={navRef}
          className={`site-nav ${isOpen ? "is-open" : ""}`}
          aria-label="Navegación principal"
          inert={isCompact && !isOpen}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
