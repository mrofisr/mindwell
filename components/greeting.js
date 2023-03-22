import React from "react";

const getTimeOfDay = (date) => {
  const hours = date.getHours();
  if (hours >= 5 && hours < 11) {
    return "Pagi";
  } else if (hours >= 11 && hours < 16) {
    return "Siang";
  } else if (hours >= 16 && hours < 21) {
    return "Sore";
  } else {
    return "Malam";
  }
};

const Greeting = ({nama}) => {
  const date = new Date();
  const timeZoneoffset = 420; // Jakarta timezone offset in minutes
  const jakartaDate = new Date(date.getTime() + timeZoneoffset * 60 * 1000);
  const timeOfDay = getTimeOfDay(jakartaDate);
  return <div>Selamat {timeOfDay}, <span className="font-bold">{nama}</span>!</div>;
};

export default Greeting;
