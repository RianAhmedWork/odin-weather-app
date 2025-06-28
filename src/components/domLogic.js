import { getLocationData } from "./logic";
export { searchLocation };

function searchLocation() {
  const button = document.getElementById("search-submit");
  const userQuery = document.getElementById("city-search");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    clearMain();
    createLoadingTitle();
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
    createToggleButton(result);
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
  const errorTitle = createTextElement(
    "h2",
    "There seems to have been an error please try again or search something else."
  );
  main.appendChild(errorTitle);
}

// Creates and appends a loading title while getting the data
function createLoadingTitle() {
  const main = document.querySelector("main");
  const loadingTitle = createTextElement("h2", "Loading Data");
  main.appendChild(loadingTitle);
}

// Creates and appends the name of the location
function createLocationTitle(result) {
  const main = document.querySelector("main");
  const locationTitle = createTextElement("h2", result.name);
  main.appendChild(locationTitle);
}

// Creates and appends a toggle temperature button to the main
function createToggleButton(result) {
  const main = document.querySelector("main");
  const toggleButton = createTextElement("button", "Switch to °C");
  toggleButton.addEventListener("click", () =>
    toggleTemperature(result, toggleButton)
  );
  main.append(toggleButton);
}

// Function that toggles the temperatures from F to C and vice versa
function toggleTemperature(result, button) {
  const temperaturesF = document.querySelectorAll(".farenheight");
  const temperaturesC = document.querySelectorAll(".celcius");
  if (temperaturesF.length > 0) {
    button.textContent = "Switch to °F";
    temperaturesF.forEach((element, index) => {
      const temperatureC = ((result.days[index].temp - 32) / 1.8).toFixed(1);
      element.textContent = `${temperatureC} °C`;
      element.classList.remove("farenheight");
      element.classList.add("celcius");
    });
  } else {
    button.textContent = "Switch to °C";
    temperaturesC.forEach((element, index) => {
      const temperatureF = result.days[index].temp.toFixed(1);
      element.textContent = `${temperatureF} °F`;
      element.classList.remove("celcius");
      element.classList.add("farenheight");
    });
  }
}

// Creates and appends the current day with weather information
function createCurrentDay(result) {
  const icon = document.createElement("img");
  setIcon(icon, result.days[0].icon);

  const temperature = document.createElement("h2");
  temperature.classList.add("farenheight");
  temperature.textContent = `${result.days[0].temp} °F`;

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

// creates and appends the remaing days weather information
function createUpcomingDays(result) {
  const main = document.querySelector("main");
  const upcomingDaysDiv = document.createElement("div");
  upcomingDaysDiv.id = "upcoming-days";

  for (let i = 1; i < 7; i++) {
    const icon = document.createElement("img");
    setIcon(icon, result.days[i].icon);

    const temperature = document.createElement("p");
    temperature.classList.add("farenheight");
    temperature.textContent = `${result.days[i].temp} °F`;

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

// Sets the icon to the appropriate svg
function setIcon(icon, iconData) {
  const iconMap = {
    snow: "snow.svg",
    rain: "rain.svg",
    fog: "fog.svg",
    wind: "wind.svg",
    cloudy: "cloudy.svg",
    "partly-cloudy-day": "partly-cloudy-day.svg",
    "partly-cloudy-night": "partly-cloudy-night.svg",
    "clear-day": "clear-day.svg",
    "clear-night": "clear-night.svg",
  };

  const fileName = iconMap[iconData];

  import(`../assets/icons/${fileName}`).then((module) => {
    icon.src = module.default;
    icon.alt = iconData;
  });
}

// creates and returns a text element with specified text
function createTextElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}
