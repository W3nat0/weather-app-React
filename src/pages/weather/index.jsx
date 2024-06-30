import React, { useEffect, useState } from "react";
import { getWeather, getWeatherIcon } from "../../api/weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

library.add(faSearch);

export default function Weather() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    handleGetWeather();
  }, []);

  async function handleGetWeather(location) {
    setLoading(true);
    try {
      const weatherResponse = await getWeather(location);
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
      } else {
        toast.error("Location not found", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Error fetching weather data. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setLocation(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (location.length > 2) {
      handleGetWeather(location);
    } else {
      toast.warn("The city name should be a minimum of 3 symbols", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        padding: "10px",
      });
    }
    setLocation("");
  }

  return (
    <div className="bg-slate-800 opacity-85 w-[45%] h-[953px] p-4 rounded-lg">
      <section className="max-w-[40%] mx-auto flex flex-col gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          {loading ? (
            <ClipLoader color={"#ffffff"} loading={loading} size={100} /> // Use ClipLoader for loading indicator
          ) : (
            weather && (
              <>
                <div className="flex justify-center">
                  <img
                    width={250}
                    src={getWeatherIcon(weather.weather[0].icon)}
                    alt="Current weather"
                  />
                </div>
                <h1 className="text-center font-semibold text-6xl text-white border-b-2 p-1">
                  {weather.name}, {weather.sys.country}
                </h1>
              </>
            )
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between items-center"
        >
          <input
            value={location}
            onChange={handleChange}
            className="w-full max-w-[90%] h-14 bg-slate-800 border-0 border-b-2 pl-2 input-field text-2xl text-white"
            placeholder="Search any city"
            type="text"
          />
          <button className="rounded-3xl text-2xl p-3 px-4 bg-gray-600 ml-2">
            <FontAwesomeIcon icon="search" style={{ color: "#fcfcfc" }} />
          </button>
        </form>
        {weather && (
          <>
            <p className="text-center text-3xl border-b-2 p-2 text-white flex justify-between">
              <span>Temperature:</span>
              {weather.main.temp} °C
            </p>
            <p className="text-center text-3xl border-b-2 p-2 text-white flex justify-between">
              <span>Humidity:</span>
              {weather.main.humidity} %
            </p>
            <p className="text-center text-3xl border-b-2 p-2 text-white flex justify-between">
              <span>Visibility:</span>
              {weather.visibility} mi
            </p>
            <p className="text-center text-3xl border-b-2 p-2 text-white flex justify-between">
              <span>Wind speed:</span>
              {weather.wind.speed} Km/h
            </p>
          </>
        )}
      </section>
    </div>
  );
}
