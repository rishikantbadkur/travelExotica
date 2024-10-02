import Button from "../../UI/Button/Button";
import styles from "./ErrorFallback.module.css";
import stylesGeneral from "../../../styles/general.module.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  return (
    <div className={styles.err_container}>
      <h2 className={styles.header_main}>Something went wrong</h2>
      <p className={stylesGeneral.body__text}>Please try again later!!</p>
      <Button btnSub={true} onClick={resetErrorBoundary}>
        Home
      </Button>
    </div>
  );
}

export default ErrorFallback;
