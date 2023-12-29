import { setStoredCities, setStoredOptions } from "../utils/storage";

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function

  //  set default cities
  setStoredCities([]).then(() => {});

  setStoredOptions({
    tempscale: "metric",
    homeCity: "",
    hasAutoOverlay: false,
  }).then(() => {});
});
