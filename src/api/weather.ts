import { format } from 'date-fns';

const API_KEY = 'b9c9f4ade17ed5d23e41b19eb37d409c'; // 替换为你的 API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export type WeatherData = {
  date: string;
  temp: number;
  humidity: number;
  description: string;
  city: string;
  windSpeed: number;
};

export const fetchWeatherData = async (cities: string[]): Promise<WeatherData[]> => {
  try {
    const weatherData: WeatherData[] = [];

    for (const city of cities) {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&hour=24&lang=zh`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      data.forecast.forecastday[0].hour.forEach((hour: any) => {
        weatherData.push({
          date: format(new Date(hour.time), 'MM-dd HH:mm'),
          temp: Math.round(hour.temp_c),
          humidity: hour.humidity,
          description: hour.condition.text,
          city,
          windSpeed: Math.round(hour.wind_kph),
        });
      });
    }

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};