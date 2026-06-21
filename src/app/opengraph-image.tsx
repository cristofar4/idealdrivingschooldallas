import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ideal Driving School, Texas's Premier Driving Academy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0c1426 0%, #070b14 60%, #100a04 100%)",
          color: "#f7f5f0",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(245,165,36,0.45), rgba(245,165,36,0) 65%)",
            display: "flex",
          }}
        />
        {/* steering wheel ring */}
        <div
          style={{
            position: "absolute",
            top: 150,
            right: -40,
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: "16px solid rgba(245,165,36,0.85)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 296,
            right: 116,
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "#f5a524",
            display: "flex",
          }}
        />

        {/* top badge */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 24,
              letterSpacing: 4,
              color: "rgba(247,245,240,0.8)",
            }}
          >
            TDLR-APPROVED · DALLAS FORT WORTH
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            Master the road,
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#f5a524",
            }}
          >
            for life.
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: "rgba(247,245,240,0.7)" }}>
            Premium driver education across the Dallas Fort Worth Metroplex.
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                border: "3px solid #f5a524",
                display: "flex",
              }}
            />
            <div style={{ marginLeft: 18, fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
              IDEAL DRIVING SCHOOL
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(247,245,240,0.85)" }}>
            4.9 rating · 12,000+ licensed · 98% pass rate
          </div>
        </div>
      </div>
    ),
    size,
  );
}
