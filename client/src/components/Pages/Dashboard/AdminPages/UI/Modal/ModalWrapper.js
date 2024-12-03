import React from "react";

import styles from "./ModalWrapper.module.css";

function ModalWrapper({ children }) {
  return <div className={styles.modal_overlay}>{children}</div>;
}

export default ModalWrapper;
