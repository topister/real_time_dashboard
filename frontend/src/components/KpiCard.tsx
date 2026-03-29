interface KpiCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: "up" | "down" | "neutral";
  accent?: string;
}

export default function KpiCard({
  label,
  value,
  icon,
  trend = "neutral",
  accent = "#00e5ff",
}: KpiCardProps) {
  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "–";
  const trendColor =
    trend === "up" ? "#4ade80" : trend === "down" ? "#ff4d6d" : "#5a7a96";

  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #1e2d3d",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color .2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e2d3d")}
    >
      {/* top accent line */}
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: ".7rem",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            color: "#5a7a96",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      </div>

      <div
        style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          color: "#e8edf2",
          lineHeight: 1,
          marginBottom: ".5rem",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: ".7rem",
          color: trendColor,
        }}
      >
        {trendSymbol} Live
      </div>

      {/* background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "-30px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
