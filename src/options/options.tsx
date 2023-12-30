import "@fontsource/roboto";
import React from "react";
import ReactDOM from "react-dom";
import "./options.css";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Radio,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  let [options, setOptions] = React.useState<LocalStorageOptions | null>(null);
  let [formState, setFormState] = React.useState<"loading" | "error" | "ready">(
    "ready"
  );

  React.useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) {
    return null;
  }

  const handleHomeCityChange = (homeCity: string) => {
    const newOptions: LocalStorageOptions = {
      ...options,
      homeCity: homeCity,
    };
    setOptions(newOptions);
  };

  const handleSave = () => {
    setFormState("loading");

    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });

    // send signal to background with name updateBadge
    chrome.runtime.sendMessage({ type: "updateBadge" });
  };

  return (
    <Box mx={"10%"} my={"2%"}>
      <Card>
        <CardContent>
          <Grid container direction={"column"} gap={"20px"}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">
                Enter the home city for your weather extension.
              </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Home city Name"
                variant="outlined"
                placeholder="Enter a city name"
                value={options.homeCity}
                onChange={(e) => handleHomeCityChange(e.target.value)}
              />
            </Grid>

            {/* add radio button if user want to show overlay by default  */}
            <Grid item>
              <Typography variant="subtitle1">
                Auto toggle overlay on page load
              </Typography>
              <Switch
                checked={options.hasAutoOverlay}
                onChange={(e) => {
                  const newOptions: LocalStorageOptions = {
                    ...options,
                    hasAutoOverlay: e.target.checked,
                  };
                  setOptions(newOptions);
                }}
              />
            </Grid>

            <Grid item>
              <Button
                disabled={formState === "loading"}
                onClick={handleSave}
                size="small"
                variant="contained"
              >
                {formState === "loading" ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
