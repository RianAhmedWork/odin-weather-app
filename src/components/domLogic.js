import { getLocationData } from "./logic";
export { searchLocation }

function searchLocation() {
    const button = document.getElementById("search-submit");
    const userQuery = document.getElementById("city-search");

    button.addEventListener((event) => {
        event.preventDefault()
    })
}