import { getLocationData } from "./logic";
export { searchLocation };

function searchLocation() {
  const button = document.getElementById("search-submit");
  const userQuery = document.getElementById("city-search");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    //console.log("hello");
    const result = await getLocationData(userQuery.value.trim().toLowerCase());
    displayData(result);
  });
}

// Displays the data from the user result
function displayData(result) {
  if (result instanceof Error) {
    clearMain();
    createErrorTitle();
  } else {
    clearMain();
    createLocationTitle(result);
    createToggleButton();
    createCurrentDay(result);
    createUpcomingDays(result);
  }
}

// Clears html content of the main tag
function clearMain() {
  const main = document.querySelector("main");
  main.innerHTML = "";
}

// Creates and appends an error title to the main tag
function createErrorTitle() {
  const main = document.querySelector("main");
  const errorTitle = document.createElement("h2");
  errorTitle.textContent =
    "There seems to have been an error please try again or search something else.";
  main.appendChild(errorTitle);
}

function createLocationTitle(result) {
  const main = document.querySelector("main");
  const locationTitle = document.createElement("h2");
  locationTitle.textContent = result.name;
  main.appendChild(locationTitle);
}

// Creates and appends a toggle temperature button to the main
function createToggleButton() {
  const main = document.querySelector("main");
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle Temperature";
  main.append(toggleButton);
}

function createCurrentDay(result) {
  const icon = document.createElement("img");
  setIcon(icon, result.days[0].icon);

  const temperature = document.createElement("h2");
  temperature.textContent = `${result.days[0].temp} Degrees Farenheight`;

  const temperatureWeatherDiv = document.createElement("div");
  temperatureWeatherDiv.id = "temp-weather";
  temperatureWeatherDiv.append(icon, temperature);

  const condition = document.createElement("p");
  condition.textContent = result.days[0].conditions;

  const date = document.createElement("p");
  date.textContent = result.days[0].datetime;

  const dateConditionDiv = document.createElement("div");
  dateConditionDiv.id = "date-condition";
  dateConditionDiv.append(condition, date);

  const description = document.createElement("p");
  description.textContent = result.days[0].description;

  const currentDayDiv = document.createElement("div");
  currentDayDiv.append(temperatureWeatherDiv, dateConditionDiv, description);

  const main = document.querySelector("main");
  main.appendChild(currentDayDiv);
}

function createUpcomingDays(result) {
  const main = document.querySelector("main");
  const upcomingDaysDiv = document.createElement("div");
  upcomingDaysDiv.id = "upcoming-days";

  for (let i = 1; i < 7; i++) {
    const icon = document.createElement("img");
    setIcon(icon, result.days[i].icon);

    const temperature = document.createElement("p");
    temperature.textContent = `${result.days[i].temp} Degrees Farenheight`;

    const date = document.createElement("p");
    date.textContent = result.days[i].datetime;

    const condition = document.createElement("p");
    condition.textContent = result.days[i].conditions;

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("days");
    dayDiv.append(icon, temperature, date, condition);

    upcomingDaysDiv.appendChild(dayDiv);
  }

  main.appendChild(upcomingDaysDiv);
}

function setIcon(icon, iconData) {
  const iconMap = {
    snow: "snow.svg",
    rain: "rain.svg",
    fog: "fog.svg",
    wind: "wind.svg",
    cloudy: "cloudy.svg",
    "partly-cloudy-day": "partly-cloudy-day.svg",
    "partly-cloudy-night": "partly-cloudy-night.svg",
    "clear-day": "clear-day",
    "night-day": "clear-night",
  };

  const fileName = iconMap[iconData];

  import(`../assets/icons/${fileName}`).then((module) => {
    icon.src = module.default;
    icon.alt = iconData;
  });
}
