export { getLocationData };

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
    console.log(locationData);
    const days = locationData.days.slice(0, 7);
    const name = locationData.resolvedAddress;
    const currentLocation = new Location(days, name);
    console.log(name);
    console.log(days);
    console.log(currentLocation);
    return currentLocation;
  } catch (error) {
    console.log(`There has been an error ${error}`);
    return error;
  }
}

class Location {
  constructor(days, name) {
    (this.days = days), (this.name = name);
  }
}
