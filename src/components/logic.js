export { getLocationData };

async function getLocationData(query) {
  try {
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      query +
      "?key=2JD7QNU3CZCB4MPLH6EXHAUFV";
    const search = await fetch(url, { mode: "cors" });
    if (!search.ok) {
      throw new Error(`HTTP error! error code: ${search.status}`);
    }
    const locationData = await search.json();
    const temperature = locationData.currentConditions.temp;
    const description = locationData.description;
    const condition = locationData.currentConditions.conditions;
    const iconData = locationData.currentConditions.icon;
    const name = locationData.resolvedAddress;
    const time = locationData.currentConditions.datetime;
    const upcomingDays = locationData.days;
    const currentLocation = new Location(
      temperature,
      description,
      condition,
      iconData,
      name,
      time,
      upcomingDays
    );
    console.log(currentLocation);
    console.log(locationData);
    console.log(upcomingDays);
    console.log(temperature);
    console.log(description, condition, iconData, name, time);
    return currentLocation;
  } catch (error) {
    console.log(`There has been an error ${error}`);
    return error;
  }
}

class Location {
  constructor(
    temperatureF,
    description,
    condition,
    iconData,
    name,
    time,
    upcomingDays
  ) {
    this.temperatureF = temperatureF.toFixed(1);
    this.temperatureC = ((temperatureF - 32) / 1.8).toFixed(1);
    this.description = description;
    this.condition = condition;
    this.iconData = iconData;
    this.name = name;
    this.time = time;
    this.upcomingDays = upcomingDays.splice(6, upcomingDays.length);
  }
}
