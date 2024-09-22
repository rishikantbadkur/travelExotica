import ReactDOM from "react-dom";
import styles from "./Spinner.module.css";

function Spinner() {
  return ReactDOM.createPortal(
    <div className={styles.loading_state}>
      <div className={styles.loading}></div>
    </div>,
    document.getElementById("portal")
  );
}

export default Spinner;
