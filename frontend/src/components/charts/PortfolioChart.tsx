"use client";

import { useTheme } from "next-themes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";

// Generate realistic-looking mock data for the last 30 days
const generateMockData = () => {
  const data = [];
  let baseValue = 115000;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some random walk volatility
    const change = (Math.random() - 0.45) * 2000;
    baseValue += change;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(baseValue),
    });
  }
  return data;
};

const mockData = generateMockData();

export default function PortfolioChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center border border-dashed border-black/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5 animate-pulse">
        <span className="text-muted-foreground">Loading chart...</span>
      </div>
    );
  }

  // Colors based on theme
  const strokeColor = resolvedTheme === "dark" ? "#818cf8" : "#4f46e5"; // Indigo
  const gridColor = resolvedTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textColor = resolvedTheme === "dark" ? "#9ca3af" : "#6b7280";
  const tooltipBg = resolvedTheme === "dark" ? "#1f2937" : "#ffffff";
  const tooltipBorder = resolvedTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipText = resolvedTheme === "dark" ? "#f3f4f6" : "#111827";

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: '8px',
              color: tooltipText,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: strokeColor, fontWeight: 500 }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={strokeColor} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            activeDot={{ r: 6, fill: strokeColor, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
