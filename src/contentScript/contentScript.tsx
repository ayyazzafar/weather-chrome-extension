import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../components/WeatherCard";
import "./contentScript.css";
import { Card } from "@mui/material";
import { LocalStorageOptions, getStoredOptions } from "../utils/storage";
const App: React.FC<{}> = () => {
  const [options, setOptions] = React.useState<LocalStorageOptions | null>(
    null
  );
  const [isActivated, setIsActivated] = React.useState<boolean>(false);

  React.useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActivated(options.hasAutoOverlay);
    });
  }, []);

  if (!options) {
    return null;
  }

  if (!isActivated) {
    return null;
  }

  return (
    <Card id="overlaycard">
      <WeatherCard
        onDelete={() => {
          setIsActivated(false);
        }}
        city={options.homeCity}
        tempscale={options.tempscale}
      ></WeatherCard>
    </Card>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
