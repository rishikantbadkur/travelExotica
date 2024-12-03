import React from "react";

import styles from "./StatBox.module.css";

function StatBox({ feature, currency }) {
  return (
    <div className={styles.feature_ctn} key={feature.name}>
      <span
        className={styles.icon_ctn}
        style={{ color: feature.color, backgroundColor: feature.bgColor }}
      >
        {feature.icon}
      </span>
      <div className={styles.text_ctn}>
        <p className={styles.text}>{feature.name}</p>
        <span className={styles.text_quantity}>
          {currency ? <span>&#x20B9;</span> : ""}
          &nbsp;{feature.value}
        </span>
      </div>
    </div>
  );
}

export default StatBox;
