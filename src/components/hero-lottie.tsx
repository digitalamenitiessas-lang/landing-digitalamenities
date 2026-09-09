"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

const ANIMATION_SRC = "/assets/animations/digitization-documents.json";

type HeroLottieProps = {
  label: string;
};

/**
 * Renderiza la animacion del hero con lottie-web importado de forma diferida:
 * el player (~50 kB gzip) solo se descarga cuando el bloque esta por entrar en
 * viewport, la animacion se pausa cuando sale de pantalla o la pestaña queda en
 * segundo plano, y queda congelada en el primer frame si el usuario pidio menos
 * movimiento.
 */
export function HeroLottie({ label }: HeroLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let animation: AnimationItem | null = null;
    let cancelled = false;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (!animation) {
        return;
      }

      const shouldPlay =
        !motionQuery.matches &&
        document.visibilityState === "visible" &&
        container.dataset.inView === "true";

      if (shouldPlay) {
        animation.play();
      } else {
        animation.pause();
      }
    };

    const mount = async () => {
      const lottie = (await import("lottie-web/build/player/lottie_light")).default;

      if (cancelled) {
        return;
      }

      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: ANIMATION_SRC,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
          progressiveLoad: true
        }
      });

      animation.addEventListener("DOMLoaded", () => {
        container.dataset.ready = "true";
        syncPlayback();
      });
    };

    // Cargamos el player recien cuando el hero esta cerca del viewport.
    const loader = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          container.dataset.inView = String(entry.isIntersecting);

          if (entry.isIntersecting && !animation) {
            void mount();
          }

          syncPlayback();
        });
      },
      { rootMargin: "200px" }
    );

    loader.observe(container);

    motionQuery.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      cancelled = true;
      loader.disconnect();
      motionQuery.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      animation?.destroy();
    };
  }, []);

  return (
    <div
      className="lottie-frame"
      ref={containerRef}
      role="img"
      aria-label={label}
    />
  );
}
