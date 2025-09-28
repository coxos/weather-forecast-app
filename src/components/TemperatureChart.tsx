// src/components/TemperatureChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ChartData {
  day: string;
  maxTemp: number;
  minTemp: number;
}

interface TemperatureChartProps {
  dailyWeather?: Array<{
    dayName: string;
    temperatureMax: number;
    temperatureMin: number;
  }>;
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

export function TemperatureChart({
  dailyWeather,
  isLoading,
}: TemperatureChartProps) {
  if (isLoading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="text-white/60 text-center">
          <div className="text-2xl mb-2">📊</div>
          <p>Grafikon betöltése...</p>
        </div>
      </div>
    );
  }

  if (!dailyWeather || dailyWeather.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="text-white/60 text-center">
          <div className="text-2xl mb-2">📊</div>
          <p>Nincs adat a grafikonhoz</p>
        </div>
      </div>
    );
  }

  // Prepare data for chart
  const chartData: ChartData[] = dailyWeather.map((day) => ({
    day: day.dayName.slice(0, 3),
    maxTemp: day.temperatureMax,
    minTemp: day.temperatureMin,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 backdrop-blur-3xl rounded-lg p-3 border border-white/20">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-[12px] text-gray-900">{`Max: ${payload[0]?.value}°C`}</p>
          <p className="text-[12px] text-gray-900">{`Min: ${payload[1]?.value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", fontSize: 12 }}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Maximum temperature line */}
          <Line
            type="monotone"
            dataKey="maxTemp"
            stroke="white"
            strokeWidth={2}
            dot={{ fill: "white", strokeWidth: 1, r: 3 }}
            activeDot={{ r: 4, fill: "white" }}
          />

          {/* Minimum temperature line */}
          <Line
            type="monotone"
            dataKey="minTemp"
            stroke="white"
            strokeWidth={2}
            dot={{ fill: "white", strokeWidth: 1, r: 3 }}
            activeDot={{ r: 4, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
