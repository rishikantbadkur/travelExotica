import React from "react";

import styles from "./Statistics.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";

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
    <div className={styles.ctn}>
      {FEATURES.map((feature) => (
        <div className={styles.feature_ctn}>
          <span
            className={styles.icon_ctn}
            style={{ color: feature.color, backgroundColor: feature.bgColor }}
          >
            {feature.icon}
          </span>
          <div className={styles.text_ctn}>
            <p className={styles.text}>{feature.name}</p>
            <span className={styles.text_quantity}>{feature.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
