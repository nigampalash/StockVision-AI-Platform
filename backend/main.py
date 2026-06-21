from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
from app.api.auth import router as auth_router
from app.api.portfolio import router as portfolio_router
from app.websockets.manager import manager, simulate_market_data
from app.core.database import engine, Base
from app.models.user import User
from app.models.portfolio import Portfolio, Transaction, Alert
import asyncio

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StockVision AI API",
    description="API for the StockVision AI Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(portfolio_router, prefix="/api/v1/portfolio", tags=["portfolio"])

@app.on_event("startup")
async def startup_event():
    # Start the background task to simulate market data over WebSockets
    asyncio.create_task(simulate_market_data())

@app.websocket("/ws/market")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming messages from client if needed
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "StockVision AI API is running."}

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}
