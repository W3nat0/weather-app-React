import React, { useState, useEffect } from "react";

export default function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col justify-end mb-14 ml-14">
      <h1 className="text-9xl text-white">{formatTime(currentTime)}</h1>
      <h2 className="text-5xl text-gray-400 mt-2">{formatDate(currentTime)}</h2>
    </div>
  );
}
