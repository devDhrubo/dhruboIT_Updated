import { ImageResponse } from "next/og";

export const alt = "Dhrubo IT — Building Digital Products That Drive Growth";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 55%, #FEF2F2 100%)",
          color: "#0B0B0F",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            DHRUBO IT
          </span>
          <span
            style={{
              marginLeft: "auto",
              padding: "10px 20px",
              borderRadius: "9999px",
              background: "#EDE9FE",
              color: "#7C3AED",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            dhruboit.tech
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: "960px",
            }}
          >
            Building Digital Products That Drive Growth
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#4B5563",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            Global Software, SaaS &amp; AI Engineering Agency • 70+ Projects
            Deployed • 99.9% Uptime SLA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#0B0B0F",
          }}
        >
          <span
            style={{
              padding: "10px 22px",
              borderRadius: "9999px",
              background: "#F0523D",
              color: "#FFFFFF",
            }}
          >
            Next.js &amp; SaaS
          </span>
          <span
            style={{
              padding: "10px 22px",
              borderRadius: "9999px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
            }}
          >
            AI &amp; RAG Systems
          </span>
          <span
            style={{
              padding: "10px 22px",
              borderRadius: "9999px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
            }}
          >
            Mobile &amp; Cloud
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
