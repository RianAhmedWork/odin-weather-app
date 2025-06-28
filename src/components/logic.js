export { getLocationData };

// A function to get the data from the api
async function getLocationData(query) {
  try {
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      query +
      "?include=days&key=2JD7QNU3CZCB4MPLH6EXHAUFV";
    const search = await fetch(url, { mode: "cors" });
    if (!search.ok) {
      throw new Error(`HTTP error! error code: ${search.status}`);
    }
    const locationData = await search.json();
    const days = locationData.days.slice(0, 7);
    const name = locationData.resolvedAddress;
    const currentLocation = new Location(days, name);
    return currentLocation;
  } catch (error) {
    console.err(`There has been an error ${error}`);
    return error;
  }
}

// creates a location object
class Location {
  constructor(days, name) {
    this.days = days;
    this.name = name;
  }
}
