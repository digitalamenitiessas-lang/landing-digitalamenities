"use client";

import Image from "next/image";

import type { CaseStudy } from "@/data/site-content";

type ClientsCarouselProps = {
  items: CaseStudy[];
};

export function ClientsCarousel({ items }: ClientsCarouselProps) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="clients-carousel">
      <div className="carousel-track">
        {duplicatedItems.map((item, index) => (
          <article
            className="carousel-card"
            key={`${item.name}-${index}`}
            aria-hidden={index >= items.length}
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
