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
import { TrendingUp } from "lucide-react";

// Generate realistic-looking mock data based on time range
const generateMockData = (timeRange: string) => {
  const data = [];
  let baseValue = 115000;
  const now = new Date();
  
  let points = 30;
  if (timeRange === '1D') points = 24; // 24 hours
  else if (timeRange === '1W') points = 7;
  else if (timeRange === '1M') points = 30;
  else if (timeRange === '1Y') points = 12; // 12 months
  else if (timeRange === 'ALL') points = 60; // 5 years monthly

  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    
    if (timeRange === '1D') {
      date.setHours(date.getHours() - i);
    } else if (timeRange === '1W' || timeRange === '1M') {
      date.setDate(date.getDate() - i);
    } else {
      // 1Y or ALL, decrement by months
      date.setMonth(date.getMonth() - i);
    }
    
    // Add some random walk volatility
    const volatility = timeRange === '1D' ? 500 : timeRange === '1Y' || timeRange === 'ALL' ? 5000 : 2000;
    const change = (Math.random() - 0.45) * volatility;
    baseValue += change;
    
    let dateStr = '';
    if (timeRange === '1D') {
      dateStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else if (timeRange === '1Y' || timeRange === 'ALL') {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', year: timeRange === 'ALL' ? '2-digit' : undefined });
    } else {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    data.push({
      date: dateStr,
      value: Math.round(baseValue),
    });
  }
  return data;
};

export default function PortfolioChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState('1M');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setChartData(generateMockData(timeRange));
  }, [timeRange]);

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
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <TrendingUp className="w-5 h-5 text-primary" />
          Portfolio Performance
        </h2>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '1Y', 'ALL'].map((time) => (
            <button 
              key={time} 
              onClick={() => setTimeRange(time)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timeRange === time ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
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
    </div>
  );
}
