import styles from "./HeaderLogout.module.css";
import useWindowTouchClose from "../../../hooks/useWindowTouchClose";
import { Link } from "react-router-dom";

const HeaderLogout = ({ logOutModalHandler, toggleLogoutMenu }) => {
  useWindowTouchClose(toggleLogoutMenu);

  return (
    <div className={styles.logout_container}>
      <ul className={styles.options_list}>
        <li className={styles.option_item}>
          <button className={styles.btn_custom} onClick={logOutModalHandler}>
            Log Out
          </button>
        </li>
        <li className={styles.option_item}>
          <Link to="/app/account">
            <button className={styles.btn_custom}>Account</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLogout;
