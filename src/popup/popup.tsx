import React from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../components/WeatherCard";
import "./popup.css";
import "@fontsource/roboto";

import { InputBase, Paper, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = React.useState<string[]>([]);
  const [cityInput, setCityInput] = React.useState<string>("");
  const [options, setOptions] = React.useState<LocalStorageOptions | null>(
    null
  );

  function handleAddCity(e) {
    if (cityInput === "") return;
    e.preventDefault();
    setCities([...cities, cityInput]);
    setCityInput("");

    setStoredCities([...cities, cityInput]);
  }

  const handleDeleteCity = (index) => {
    let c = [...cities];
    c.splice(index, 1);
    setCities([...c]);

    setStoredCities([...c]);
  };

  React.useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) {
    return null;
  }

  const handleOptionsChange = () => {
    const newOptions: LocalStorageOptions = {
      ...options,
      tempscale: options.tempscale === "imperial" ? "metric" : "imperial",
    };
    setStoredOptions(newOptions).then(() => setOptions(newOptions));
  };

  return (
    <div>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add City"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <IconButton
          onClick={handleAddCity}
          type="submit"
          sx={{ p: "10px" }}
          aria-label="add"
        >
          <AddIcon />
        </IconButton>

        <IconButton
          onClick={handleOptionsChange}
          sx={{ p: "10px" }}
          aria-label="settings"
        >
          {/* unicode celcius icon */}
          {options.tempscale === "imperial" ? (
            <span>&#8457;</span>
          ) : (
            <span>&#8451;</span>
          )}
        </IconButton>
      </Paper>

      {options.homeCity && (
        <WeatherCard
          tempscale={options.tempscale}
          city={options.homeCity}
          key={options.homeCity}
        />
      )}

      {cities &&
        cities.map((city, index) => (
          <WeatherCard
            tempscale={options.tempscale}
            city={city}
            key={city}
            onDelete={() => {
              handleDeleteCity(index);
            }}
          />
        ))}
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
