"use client";

import { ActivityItem } from "@/hooks/useWebSocket";

interface Props {
  activities: ActivityItem[];
}

const levelColors: Record<string, string> = {
  info: "#00e5ff",
  success: "#4ade80",
  error: "#ff4d6d",
  warning: "#f59e0b",
};

const levelBg: Record<string, string> = {
  info: "rgba(0,229,255,.06)",
  success: "rgba(74,222,128,.06)",
  error: "rgba(255,77,109,.06)",
  warning: "rgba(245,158,11,.06)",
};

export default function ActivityFeed({ activities }: Props) {
  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #1e2d3d",
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.2rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: ".7rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "#5a7a96",
            }}
          >
            {/* System Events */}
          </p>
          <h3
            style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: ".25rem" }}
          >
            Activity Feed
          </h3>
        </div>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: ".65rem",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#4ade80",
            border: "1px solid #4ade8033",
            padding: ".2rem .6rem",
          }}
        >
          ● Live
        </span>
      </div>

      {/* Events list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          maxHeight: "340px",
          overflowY: "auto",
        }}
      >
        {activities.length === 0 && (
          <div
            style={{
              fontFamily: "monospace",
              fontSize: ".78rem",
              color: "#5a7a96",
              textAlign: "center",
              padding: "2rem",
            }}
          >
            Waiting for events...
          </div>
        )}

        {activities.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: ".75rem 1rem",
              background: index === 0 ? levelBg[item.level] : "transparent",
              border: "1px solid",
              borderColor:
                index === 0 ? levelColors[item.level] + "33" : "#1e2d3d",
              transition: "all .3s ease",
              animation: index === 0 ? "slideIn .3s ease" : "none",
            }}
          >
            {/* Icon */}
            <span
              style={{
                fontSize: "1.1rem",
                minWidth: "24px",
                textAlign: "center",
              }}
            >
              {item.icon}
            </span>

            {/* Event text */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: ".85rem",
                  fontWeight: 600,
                  color: "#e8edf2",
                }}
              >
                {item.event}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: ".65rem",
                  color: "#5a7a96",
                  marginTop: ".15rem",
                }}
              >
                ID #{item.id}
              </div>
            </div>

            {/* Level badge */}
            <span
              style={{
                fontFamily: "monospace",
                fontSize: ".6rem",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: ".2rem .55rem",
                background: levelBg[item.level],
                color: levelColors[item.level],
                border: `1px solid ${levelColors[item.level]}33`,
                whiteSpace: "nowrap",
              }}
            >
              {item.level}
            </span>

            {/* Timestamp */}
            <span
              style={{
                fontFamily: "monospace",
                fontSize: ".65rem",
                color: "#5a7a96",
                whiteSpace: "nowrap",
                minWidth: "60px",
                textAlign: "right",
              }}
            >
              {item.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
