import { getLocationData } from "./logic";
export { searchLocation }

function searchLocation() {
    const button = document.getElementById("search-submit");
    const userQuery = document.getElementById("city-search");

    button.addEventListener("click", (event) => {
        event.preventDefault()
        //console.log("hello");
        getLocationData(userQuery.value.trim().toLowerCase());
    })
}