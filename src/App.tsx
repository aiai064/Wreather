import React, { useState, useEffect } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { WeatherChart } from './components/WeatherChart';
import { fetchWeatherData, type WeatherData } from './api/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const cities = ['泉州', '福州'];
  const cityColors = {
    '泉州': '#3b82f6',
    '福州': '#ef4444'
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWeatherData(cities);
        setWeatherData(data);
      } catch (error) {
        console.error('Failed to load weather data:', error);
        // Fallback to mock data for demo
        const mockData = generateMockData();
        setWeatherData(mockData);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const generateMockData = () => {
    const data: WeatherData[] = [];
    const baseTemp = 22;
    const baseHumidity = 65;
    const weatherTypes = ['晴朗', '多云', '小雨', '阴天'];
    
    for (const city of cities) {
      for (let i = 0; i < 24; i++) {
        const tempVariation = Math.sin(i / 24 * Math.PI * 2) * 5;
        const humidityVariation = Math.cos(i / 24 * Math.PI * 2) * 15;
        
        data.push({
          date: new Date(Date.now() + i * 3600000).toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          temp: Math.round(baseTemp + tempVariation + Math.random() * 2),
          humidity: Math.round(baseHumidity + humidityVariation + Math.random() * 5),
          description: weatherTypes[Math.floor(Math.random() * weatherTypes.length)],
          city,
          windSpeed: Math.round(8 + Math.random() * 12),
        });
      }
    }
    return data;
  };

  const getLatestCityData = (city: string) => {
    return weatherData.find(data => data.city === city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            闽南天气实况
          </h1>
          <p className="text-lg text-gray-600">
            泉州 & 福州 24小时天气趋势
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {cities.map(city => (
            <WeatherCard 
              key={city}
              city={city}
              data={getLatestCityData(city)}
            />
          ))}
        </div>

        <WeatherChart
          data={weatherData}
          dataKey="temp"
          title="温度变化趋势"
          cities={cities}
          colors={cityColors}
        />

        <WeatherChart
          data={weatherData}
          dataKey="humidity"
          title="湿度变化趋势"
          cities={cities}
          colors={{
            '泉州': '#8b5cf6',
            '福州': '#10b981'
          }}
        />
      </div>
    </div>
  );
}

export default App;