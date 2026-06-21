from fastapi import WebSocket
import asyncio
import json
import random

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

async def simulate_market_data():
    """
    Simulates real-time price ticks for demonstration purposes.
    """
    while True:
        # Simulate price updates for popular stocks
        updates = {
            "AAPL": round(150 + random.uniform(-1, 1), 2),
            "MSFT": round(350 + random.uniform(-2, 2), 2),
            "NVDA": round(900 + random.uniform(-5, 5), 2),
        }
        await manager.broadcast(json.dumps({"type": "PRICE_UPDATE", "data": updates}))
        await asyncio.sleep(2) # Send updates every 2 seconds
