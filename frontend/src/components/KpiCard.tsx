"use client";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: "up" | "down" | "neutral";
  accent?: string;
  loading?: boolean;
}

export default function KpiCard({
  label,
  value,
  icon,
  trend = "neutral",
  accent = "#00e5ff",
  loading = false,
}: KpiCardProps) {
  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "–";
  const trendColor =
    trend === "up" ? "#4ade80" : trend === "down" ? "#ff4d6d" : "#5a7a96";

  return (
    <div
      className="fade-in"
      style={{
        background: "#0d1117",
        border: "1px solid #1e2d3d",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color .25s, transform .25s, box-shadow .25s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 30px ${accent}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e2d3d";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: accent,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.2rem",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: ".68rem",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            color: "#5a7a96",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      </div>

      {/* Value */}
      {loading ? (
        <div
          className="skeleton"
          style={{ height: "2.2rem", width: "70%", marginBottom: ".6rem" }}
        />
      ) : (
        <div
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#e8edf2",
            lineHeight: 1,
            marginBottom: ".6rem",
            fontVariantNumeric: "tabular-nums",
            transition: "color .3s",
          }}
        >
          {value}
        </div>
      )}

      {/* Trend */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: ".68rem",
          color: trendColor,
          display: "flex",
          alignItems: "center",
          gap: ".3rem",
        }}
      >
        <span>{trendSymbol}</span>
        <span>Live update</span>
      </div>

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "-30px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "opacity .3s",
        }}
      />
    </div>
  );
}
