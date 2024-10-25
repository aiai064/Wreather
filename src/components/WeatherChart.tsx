import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { WeatherData } from '../api/weather';

interface WeatherChartProps {
  data: WeatherData[];
  dataKey: 'temp' | 'humidity';
  title: string;
  cities: string[];
  colors: {
    [key: string]: string;
  };
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data, dataKey, title, cities, colors }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {cities.map((city) => (
              <Line
                key={city}
                type="monotone"
                dataKey={dataKey}
                data={data.filter(d => d.city === city)}
                name={city}
                stroke={colors[city]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};