"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { brandAssets } from "@/data/brand-assets";
import { navItems } from "@/data/site-content";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevenir scroll en el body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a className="brand-lockup" href="#top" aria-label="Digital Amenities" onClick={() => setIsOpen(false)}>
          <Image
            src={brandAssets.headerPrimary.src}
            alt={brandAssets.headerPrimary.alt}
            width={220}
            height={220}
            priority
          />
        </a>

        <button 
          className={`mobile-menu-toggle ${isOpen ? "is-open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label="Navegación principal">
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
