import React from 'react';
import { Cloud, CloudDrizzle, Sun, Droplets, Wind, ThermometerSun } from 'lucide-react';
import type { WeatherData } from '../api/weather';

interface WeatherCardProps {
  city: string;
  data: WeatherData | undefined;
}

const getWeatherIcon = (description: string) => {
  if (description.includes('晴')) {
    return <Sun className="w-12 h-12 text-yellow-500" />;
  } else if (description.includes('云')) {
    return <Cloud className="w-12 h-12 text-gray-500" />;
  } else if (description.includes('雨')) {
    return <CloudDrizzle className="w-12 h-12 text-blue-500" />;
  }
  return <Cloud className="w-12 h-12 text-gray-400" />;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{city}</h3>
          <p className="text-gray-500 mt-1">{data.date}</p>
        </div>
        {getWeatherIcon(data.description)}
      </div>
      
      <div className="flex items-center mb-6">
        <ThermometerSun className="w-8 h-8 text-red-500 mr-3" />
        <span className="text-4xl font-bold text-gray-800">{data.temp}°C</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <Droplets className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-gray-600">湿度</span>
          </div>
          <p className="text-lg font-semibold mt-1">{data.humidity}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <Wind className="w-5 h-5 text-teal-500 mr-2" />
            <span className="text-gray-600">风速</span>
          </div>
          <p className="text-lg font-semibold mt-1">{data.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};