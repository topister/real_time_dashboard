"use client";

import KpiCard from "@/components/KpiCard";
import StatusBar from "@/components/StatusBar";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function Dashboard() {
  const { kpi, connected } = useWebSocket();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b0f",
        color: "#e8edf2",
        fontFamily: "'Syne', sans-serif",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              letterSpacing: "-.02em",
              marginBottom: ".25rem",
            }}
          >
            Real-Time Dashboard
          </h1>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: ".75rem",
              color: "#5a7a96",
            }}
          >
            Live metrics — updates every 2s
          </p>
        </div>
        <StatusBar connected={connected} />
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1px",
          background: "#1e2d3d",
          marginBottom: "2rem",
        }}
      >
        <KpiCard
          label="Revenue"
          value={kpi ? `$${kpi.revenue.toLocaleString()}` : "—"}
          icon="💰"
          trend="up"
          accent="#00e5ff"
        />
        <KpiCard
          label="Active Users"
          value={kpi ? kpi.active_users.toLocaleString() : "—"}
          icon="👥"
          trend="up"
          accent="#7b61ff"
        />
        <KpiCard
          label="Requests / sec"
          value={kpi ? kpi.requests.toLocaleString() : "—"}
          icon="⚡"
          trend="neutral"
          accent="#f59e0b"
        />
        <KpiCard
          label="Error Rate"
          value={kpi ? `${kpi.error_rate}%` : "—"}
          icon="🔴"
          trend="down"
          accent="#ff4d6d"
        />
      </div>

      {/* Placeholder for charts + activity (Step 4 & 5) */}
      <div
        style={{
          border: "1px dashed #1e2d3d",
          padding: "3rem",
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: ".8rem",
          color: "#5a7a96",
        }}
      ></div>
    </main>
  );
}
