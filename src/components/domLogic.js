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
    createToggleButton();
    createCurrentDay();
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

// Creates and appends a toggle temperature button to the main
function createToggleButton() {
  const main = document.getElementById("main");
  const toggleButton = document.querySelector("button");
  toggleButton.textContent = "Toggle Temperature";
  main.appendChild(toggleButton);
}

function createCurrentDay() {
  const main = document.getElementById("main");
}
