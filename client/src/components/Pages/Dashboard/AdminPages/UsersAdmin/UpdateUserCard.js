import React from "react";

import styles from "./UpdateUserCard.module.css";

function UpdateUserCard() {
  return (
    <div className={styles.ctn}>
      <div className={styles.btn_ctn}>
        <button className={styles.btn}>Update</button>
        <button className={styles.btn}>Delete</button>
      </div>
    </div>
  );
}

export default UpdateUserCard;
