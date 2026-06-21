'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

export function TradingViewChart({ symbol }: { symbol: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9ca3af', // text-muted-foreground
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e', // chart-1 green
      downColor: '#ef4444', // chart-2 red
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Mock data for demonstration
    const mockData = [
      { time: '2023-10-01', open: 150, high: 155, low: 149, close: 152 },
      { time: '2023-10-02', open: 152, high: 158, low: 151, close: 156 },
      { time: '2023-10-03', open: 156, high: 159, low: 154, close: 155 },
      { time: '2023-10-04', open: 155, high: 156, low: 148, close: 149 },
      { time: '2023-10-05', open: 149, high: 154, low: 148, close: 153 },
      { time: '2023-10-06', open: 153, high: 160, low: 152, close: 159 },
    ];

    candlestickSeries.setData(mockData);
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}
