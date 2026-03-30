"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartPoint } from "@/hooks/useWebSocket";

interface Props {
  data: ChartPoint[];
}

export default function BarChartCard({ data }: Props) {
  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #1e2d3d",
        padding: "1.5rem",
      }}
    >
      <div style={{ marginBottom: "1.2rem" }}>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: ".7rem",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            color: "#5a7a96",
          }}
        >
          {/* Sales vs Errors */}
        </p>
        <h3
          style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: ".25rem" }}
        >
          Performance Breakdown
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
          <XAxis
            dataKey="time"
            tick={{ fontFamily: "monospace", fontSize: 10, fill: "#5a7a96" }}
            tickLine={false}
            axisLine={{ stroke: "#1e2d3d" }}
          />
          <YAxis
            tick={{ fontFamily: "monospace", fontSize: 10, fill: "#5a7a96" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#141c26",
              border: "1px solid #1e2d3d",
              fontFamily: "monospace",
              fontSize: ".75rem",
            }}
            labelStyle={{ color: "#5a7a96" }}
            itemStyle={{ color: "#e8edf2" }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "monospace",
              fontSize: ".7rem",
              paddingTop: "1rem",
            }}
          />
          <Bar
            dataKey="sales"
            fill="#7b61ff"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="errors"
            fill="#ff4d6d"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
