import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
} from "../../utils/api";

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>

        {onDelete && (
          <CardActions>
            <Button onClick={onDelete} size="small" color="secondary">
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

const WeatherCard: React.FC<{
  city: string;
  onDelete?: () => void;
  tempscale: OpenWeatherTempScale;
}> = ({ city, onDelete, tempscale }) => {
  const [weatherData, setWeatherData] = React.useState<OpenWeatherData | null>(
    null
  );
  const [state, setState] = React.useState<WeatherCardState>("loading");

  useEffect(() => {
    setState("loading");
    fetchOpenWeatherData(city, tempscale)
      .then((data) => {
        setWeatherData(data);
        console.log("Temperature is " + data.main.temp + "°C");
        setState("ready");
      })
      .catch((e) => {
        setState("error");
      });
  }, [city, tempscale]);

  if (state === "error" || state === "loading") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {state === "error"
            ? "Error: Could not retrieve weather data for this."
            : "Loading..."}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5" component="div">
        {" "}
        {weatherData.name}
      </Typography>

      <Typography variant="body1">
        {Math.round(weatherData.main.temp) +
          (tempscale === "metric" ? "°C" : "°F")}
      </Typography>
      <Typography variant="body1">
        Feels like:{" "}
        {Math.round(weatherData.main.feels_like) +
          (tempscale === "metric" ? "°C" : "°F")}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
