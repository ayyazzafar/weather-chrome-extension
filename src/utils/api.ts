const OPEN_WEATHER_API_KEY = "0db9f6bb8a3828ecabff3ab00cc6e9b2";
export interface OpenWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
    today: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type OpenWeatherTempScale = "metric" | "imperial";

export async function fetchOpenWeatherData(
  city: string,
  tempscale: OpenWeatherTempScale
) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${tempscale}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  let data: OpenWeatherData = await res.json();

  return data;
}

export function getWeatherIconSrc(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
