import Button from "../../UI/Button/Button";

import styles from "./Logout.module.css";
import stylesGeneral from "../../../styles/general.module.css";

const Logout = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.logo_ctn}>
        <div className={stylesGeneral.header__logo}>
          <aside>
            trav-el-
            <span className={stylesGeneral.text_highlight}>Exotica</span>
          </aside>
        </div>
      </div>
      <div className={`${styles.logout} `}>
        <h1>Logout Successful</h1>
        <span>
          <Button
            onClick={() => {
              window.location.href = "/app/home";
            }}
          >
            Home
          </Button>
        </span>
      </div>
    </section>
  );
};

export default Logout;
