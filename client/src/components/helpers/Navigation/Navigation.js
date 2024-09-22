import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../users/UserProvider";

import styles from "./Navigation.module.css";

const NAV_LIST = [
  { index: "Home", route: "/app/home" },
  { index: "Travel", route: "/app/tours" },
  { index: "Services", route: "/app/services" },
  { index: "Contact us", route: "/app/contacts" },
];

const NAV_LOGLIST = [
  { index: "Blogs", route: "/app/blogs" },
  { index: "Bookings", route: "/app/mybookings" },
];

const Navigation = ({ mobile, onLinkClick }) => {
  const { userState } = useContext(UserContext);

  let navList = NAV_LIST;

  if (userState.user && userState.authenticated) {
    navList = [...NAV_LIST.slice(0, 3), ...NAV_LOGLIST, ...NAV_LIST.slice(3)];
  }

  return (
    <nav className={styles.navigation}>
      <ul
        className={
          mobile
            ? `${styles.header__links} ${styles.mobile_nav}`
            : `${styles.header__links}`
        }
      >
        {navList.map((navItem) => (
          <li className={styles.header__links__self} key={navItem.index}>
            <NavLink
              className={styles.header__link}
              to={navItem.route}
              onClick={onLinkClick}
            >
              {navItem.index}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
