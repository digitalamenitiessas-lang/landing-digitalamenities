"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import type { CaseStudy } from "@/data/site-content";

type ClientsCarouselProps = {
  items: CaseStudy[];
};

export function ClientsCarousel({ items }: ClientsCarouselProps) {
  // Duplicamos 3 veces para asegurar que el bucle de scroll sea indetectable
  const duplicatedItems = [...items, ...items, ...items];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let animationId: number;

    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += 0.8; // Velocidad del scroll
        
        const oneSetWidth = el.scrollWidth / 3;
        // Si llegamos al final del segundo set, volvemos al inicio del segundo set
        if (el.scrollLeft >= oneSetWidth * 2) {
          el.scrollLeft -= oneSetWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <div 
      className="clients-carousel"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="carousel-track">
        {duplicatedItems.map((item, index) => (
          <article
            className={`carousel-card ${activeIndex === index ? 'is-active' : ''}`}
            key={`${item.name}-${index}`}
            aria-hidden={index >= items.length && index < items.length * 2 ? false : true}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <div className="carousel-logo-wrap">
              <Image src={item.logo} alt={item.alt} width={140} height={72} className="carousel-logo" />
            </div>
            <strong>{item.name}</strong>
            
            <div className="carousel-overlay">
              <span className="case-category">{item.category}</span>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
