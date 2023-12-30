import { fetchOpenWeatherData } from "../utils/api";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // hourly update
  chrome.alarms.create("update", {
    periodInMinutes: 60,
  });

  // TODO: on installed function

  //  set default cities
  setStoredCities([]).then(() => {});

  setStoredOptions({
    tempscale: "metric",
    homeCity: "",
    hasAutoOverlay: false,
  }).then(() => {});

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  console.log(event.selectionText);
  getStoredCities().then((cities) => {
    const newCities = [...cities, event.selectionText];
    setStoredCities(newCities).then(() => {});
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  updateWeatherBadge();
});

// listen to updateBadge to change the metric
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateBadge") {
    updateWeatherBadge();
  }
});

function updateWeatherBadge() {
  getStoredOptions().then((options) => {
    if (options.homeCity === "") {
      return;
    }

    fetchOpenWeatherData(options.homeCity, options.tempscale).then((data) => {
      let temp = Math.round(data.main.temp);
      const symbol = options.tempscale === "metric" ? "°C" : "°F";
      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      });
    });
  });
}
