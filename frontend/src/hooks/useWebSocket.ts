import { useEffect, useRef, useState, useCallback } from "react";

export type WSMessage =
  | { type: "kpi";      data: KPIData }
  | { type: "chart";    data: ChartPoint }
  | { type: "activity"; data: ActivityItem };

export interface KPIData {
  revenue:      number;
  active_users: number;
  requests:     number;
  error_rate:   number;
}

export interface ChartPoint {
  time:    string;
  traffic: number;
  sales:   number;
  errors:  number;
}

export interface ActivityItem {
  id:        number;
  event:     string;
  icon:      string;
  level:     "info" | "success" | "error" | "warning";
  timestamp: string;
}

const WS_URL = "ws://localhost:8000/ws";

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [kpi,        setKpi]        = useState<KPIData | null>(null);
  const [chartData,  setChartData]  = useState<ChartPoint[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [connected,  setConnected]  = useState(false);

  const connect = useCallback(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => setConnected(true);

    ws.current.onmessage = (e) => {
      const msg: WSMessage = JSON.parse(e.data);
      if (msg.type === "kpi") {
        setKpi(msg.data);
      } else if (msg.type === "chart") {
        setChartData(prev => [...prev.slice(-20), msg.data]); // keep last 20 points
      } else if (msg.type === "activity") {
        setActivities(prev => [msg.data, ...prev.slice(0, 19)]); // keep last 20
      }
    };

    ws.current.onclose = () => {
      setConnected(false);
      setTimeout(connect, 3000); // auto-reconnect after 3s
    };

    ws.current.onerror = () => ws.current?.close();
  }, []);

  useEffect(() => {
    connect();
    return () => ws.current?.close();
  }, [connect]);

  return { kpi, chartData, activities, connected };
}