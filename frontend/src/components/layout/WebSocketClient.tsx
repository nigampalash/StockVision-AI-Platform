'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';

// Global store for real-time prices
interface MarketStore {
  prices: Record<string, number>;
  setPrice: (symbol: string, price: number) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  prices: {},
  setPrice: (symbol, price) => set((state) => ({ prices: { ...state.prices, [symbol]: price } })),
}));

export function WebSocketClient() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const setPrice = useMarketStore(state => state.setPrice);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket('ws://localhost:8000/ws/market');

      ws.onopen = () => {
        setStatus('connected');
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'PRICE_UPDATE') {
            const updates = message.data;
            Object.entries(updates).forEach(([symbol, price]) => {
              setPrice(symbol, price as number);
            });
          }
        } catch (e) {
          console.error("Failed to parse WS message", e);
        }
      };

      ws.onclose = () => {
        setStatus('disconnected');
        // Try to reconnect in 5 seconds
        reconnectTimer = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, [setPrice]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">WS:</span>
        {status === 'connected' && <span className="text-chart-1 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-1 animate-pulse"></span>Connected</span>}
        {status === 'connecting' && <span className="text-chart-4 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-4 animate-pulse"></span>Connecting</span>}
        {status === 'disconnected' && <span className="text-chart-2 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-2"></span>Offline</span>}
      </div>
    </div>
  );
}
