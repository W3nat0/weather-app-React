export async function getWeather(location = "Yerevan") {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WEATHER_HOST}?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function getWeatherIcon(iconName) {
  return `${process.env.REACT_APP_WEATHER_ICON_URL}/${iconName}.png`;
}
