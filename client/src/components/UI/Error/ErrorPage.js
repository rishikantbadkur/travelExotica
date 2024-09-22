import styles from "./ErrorPage.module.css";
import stylesGeneral from "../../../styles/general.module.css";

function ErrorPage({ message }) {
  return (
    <div className={styles.container}>
      <h3 className={`${stylesGeneral.heading_quaternary}`}>
        An Unexpected error occured!
      </h3>
      <br />
      <p className={stylesGeneral.body__text}>{message}</p>
    </div>
  );
}

export default ErrorPage;
