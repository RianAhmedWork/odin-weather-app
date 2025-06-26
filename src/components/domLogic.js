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

function displayData(result) {
  const main = document.querySelector("main");
  if (result instanceof Error) {
    main.innerHTML = "";
    const errorHeading = document.createElement("h2");
    errorHeading.textContent =
      "There seems to have been an error please try again or search something else.";
    main.appendChild(errorHeading);
  }
}
