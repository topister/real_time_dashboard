interface StatusBarProps {
  connected: boolean;
}

export default function StatusBar({ connected }: StatusBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".6rem",
        fontFamily: "monospace",
        fontSize: ".7rem",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: connected ? "#4ade80" : "#ff4d6d",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: connected ? "#4ade80" : "#ff4d6d",
          boxShadow: connected ? "0 0 8px #4ade80" : "0 0 8px #ff4d6d",
          animation: connected ? "pulse 2s infinite" : "none",
          display: "inline-block",
        }}
      />
      {connected ? "Live — Connected" : "Reconnecting..."}
    </div>
  );
}
