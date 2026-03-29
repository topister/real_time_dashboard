import asyncio
import json
import random
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Client connected. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f"Client disconnected. Total: {len(self.active_connections)}")

    async def send(self, websocket: WebSocket, data: dict):
        await websocket.send_text(json.dumps(data))


manager = ConnectionManager()

# ── Mock data generators
def generate_kpis():
    return {
        "type": "kpi",
        "data": {
            "revenue":      round(random.uniform(12000, 18000), 2),
            "active_users": random.randint(800, 1500),
            "requests":     random.randint(3000, 8000),
            "error_rate":   round(random.uniform(0.1, 2.5), 2),
        }
    }

def generate_chart_point():
    now = datetime.now().strftime("%H:%M:%S")
    return {
        "type": "chart",
        "data": {
            "time":     now,
            "traffic":  random.randint(100, 500),
            "sales":    random.randint(20, 120),
            "errors":   random.randint(0, 20),
        }
    }

ACTIVITY_EVENTS = [
    ("User signed up",        "👤", "info"),
    ("New order placed",      "🛒", "success"),
    ("Payment failed",        "💳", "error"),
    ("Report downloaded",     "📄", "info"),
    ("API limit reached",     "⚠️",  "warning"),
    ("New comment posted",    "💬", "info"),
    ("Server CPU spike",      "🖥️",  "warning"),
    ("Deployment succeeded",  "🚀", "success"),
]

def generate_activity():
    event, icon, level = random.choice(ACTIVITY_EVENTS)
    return {
        "type": "activity",
        "data": {
            "id":        random.randint(1000, 9999),
            "event":     event,
            "icon":      icon,
            "level":     level,
            "timestamp": datetime.now().strftime("%H:%M:%S"),
        }
    }


# ── WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    tick = 0
    try:
        while True:
            # Send KPIs every tick
            await manager.send(websocket, generate_kpis())

            # Send chart point every tick
            await manager.send(websocket, generate_chart_point())

            # Send activity event every 3 ticks
            if tick % 3 == 0:
                await manager.send(websocket, generate_activity())

            tick += 1
            await asyncio.sleep(2)

    except WebSocketDisconnect:
        manager.disconnect(websocket)


# ── Health check
@app.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}