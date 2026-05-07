"use client";

import Script from "next/script";

export function HeroLottie() {
  return (
    <>
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="afterInteractive"
      />

      <div className="lottie-shell">
        <div className="lottie-frame">
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="/assets/animations/digitization-documents.json"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
}
