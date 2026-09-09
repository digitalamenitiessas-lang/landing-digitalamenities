import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Digital Amenities — El confort también es digital";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(140deg, #0b0b0c 0%, #35353a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.66)"
          }}
        >
          <div style={{ width: 46, height: 1, background: "rgba(255,255,255,0.5)" }} />
          Digital Amenities
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4 }}>
            Creamos amenities
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.1, letterSpacing: -4 }}>digitales.</div>
        </div>

        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.72)" }}>
          El confort también es digital.
        </div>
      </div>
    ),
    size
  );
}
