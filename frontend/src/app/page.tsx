"use client";

import KpiCard from "@/components/KpiCard";
import StatusBar from "@/components/StatusBar";
import LineChartCard from "@/components/LineChartCard";
import BarChartCard from "@/components/BarChartCard";
import ActivityFeed from "@/components/ActivityFeed";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function Dashboard() {
  const { kpi, chartData, activities, connected } = useWebSocket();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b0f",
        color: "#e8edf2",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* ── Grid background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(rgba(0,229,255,.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,.025) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
          animation: "gridMove 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 20%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 20%, black 30%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(1rem, 3vw, 2.5rem)",
        }}
      >
        {/* ── Header ── */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #1e2d3d",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: ".68rem",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#00e5ff",
                marginBottom: ".4rem",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <span style={{ color: "#5a7a96" }}></span> Topister
            </div>
            <h1
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-.03em",
                lineHeight: 1,
              }}
            >
              Real-Time Dashboard
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: ".5rem",
            }}
          >
            <StatusBar connected={connected} />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: ".65rem",
                color: "#5a7a96",
              }}
            >
              ↻ every 2s
            </span>
          </div>
        </header>

        {/* ── KPI Cards ── */}
        <section style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: ".65rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#5a7a96",
              marginBottom: ".75rem",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <span style={{ color: "#00e5ff" }}></span> Key Metrics
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1px",
              background: "#1e2d3d",
            }}
          >
            <KpiCard
              label="Revenue"
              value={kpi ? `$${kpi.revenue.toLocaleString()}` : "—"}
              icon="💰"
              trend="up"
              accent="#00e5ff"
              loading={!kpi}
            />
            <KpiCard
              label="Active Users"
              value={kpi ? kpi.active_users.toLocaleString() : "—"}
              icon="👥"
              trend="up"
              accent="#7b61ff"
              loading={!kpi}
            />
            <KpiCard
              label="Requests / sec"
              value={kpi ? kpi.requests.toLocaleString() : "—"}
              icon="⚡"
              trend="neutral"
              accent="#f59e0b"
              loading={!kpi}
            />
            <KpiCard
              label="Error Rate"
              value={kpi ? `${kpi.error_rate}%` : "—"}
              icon="🔴"
              trend="down"
              accent="#ff4d6d"
              loading={!kpi}
            />
          </div>
        </section>

        {/* ── Charts ── */}
        <section style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: ".65rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#5a7a96",
              marginBottom: ".75rem",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <span style={{ color: "#7b61ff" }}></span> Live Charts
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
              gap: "1px",
              background: "#1e2d3d",
            }}
          >
            <LineChartCard data={chartData} />
            <BarChartCard data={chartData} />
          </div>
        </section>

        {/* ── Activity Feed ── */}
        <section>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: ".65rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#5a7a96",
              marginBottom: ".75rem",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <span style={{ color: "#ff4d6d" }}></span> Activity Feed
          </div>
          <ActivityFeed activities={activities} />
        </section>

        {/* ── Footer ── */}
        <footer
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #1e2d3d",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: ".65rem",
              color: "#5a7a96",
            }}
          >
            © 2026 <span style={{ color: "#00e5ff" }}>Topister</span> —
            Real-Time Dashboard
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: ".65rem",
              color: "#5a7a96",
            }}
          >
            Next.js · FastAPI · WebSocket
          </span>
        </footer>
      </div>
    </main>
  );
}
