import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminNav.module.css";

import stylesGeneral from "../../../styles/general.module.css";

const NAV_OPTIONS = [
  {
    label: "Home",
    url: "/app/admin/dashboard",
    icon: <ion-icon name="home-outline"></ion-icon>,
  },
  {
    label: "Tours",
    url: "/app/admin/tours",
    icon: <ion-icon name="earth-outline"></ion-icon>,
  },
  {
    label: "Users",
    url: "/app/admin/users",
    icon: <ion-icon name="people-outline"></ion-icon>,
  },
  {
    label: "Bookings",
    url: "/app/admin/bookings",
    icon: <ion-icon name="id-card-outline"></ion-icon>,
  },
  {
    label: "Reviews",
    url: "/app/admin/reviews",
    icon: <ion-icon name="star-outline"></ion-icon>,
  },
  {
    label: "Settings",
    url: "/app/admin/settings",
    icon: <ion-icon name="settings-outline"></ion-icon>,
  },
];

function AdminNav() {
  return (
    <div className={styles.list_wrapper}>
      <ul className={styles.nav_list}>
        {NAV_OPTIONS.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.url}
              className={`${styles.nav_link} ${stylesGeneral.body__text}`}
            >
              <div className={styles.link_ctn}>
                <span className={styles.icon_ctn}>{item.icon}</span>
                <span className={styles.link_text_ctn}>{item.label}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminNav;
