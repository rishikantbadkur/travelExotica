import React from "react";

import StatBox from "../UI/StatBox/StatBox";

const FEATURES = [
  {
    name: "Bookings",
    icon: <ion-icon name="reader-outline"></ion-icon>,
    color: "#458e53",
    bgColor: "#c7f7d1",
    value: 45,
  },
  {
    name: "Sales",
    icon: <ion-icon name="wallet-outline"></ion-icon>,
    color: "#6c48c5",
    bgColor: "#f0edf9",
    value: 276554,
  },
  {
    name: "Users",
    icon: <ion-icon name="people-outline"></ion-icon>,
    color: "#beb262",
    bgColor: "#f8f2ca",
    value: 63,
  },
  {
    name: "Occupancy Rate",
    icon: <ion-icon name="stats-chart-outline"></ion-icon>,
    color: "#cd5c08",
    bgColor: "#f5dece",
    value: "10 %",
  },
];

function Statistics() {
  return (
    <>
      <StatBox feature={FEATURES[0]} />
      <StatBox feature={FEATURES[1]} />
      <StatBox feature={FEATURES[2]} />
      <StatBox feature={FEATURES[3]} />
    </>
  );
}

export default Statistics;
