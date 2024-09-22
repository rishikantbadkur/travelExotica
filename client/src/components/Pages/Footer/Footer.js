import { motion, useInView } from "framer-motion";

import styles from "./Footer.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Button from "../../UI/Button/Button";
import { useRef } from "react";

const LOGO_ICON = [
  "logo-facebook",
  "logo-instagram",
  "logo-youtube",
  "logo-twitter",
];

const Footer = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <section className={styles.footer} ref={ref}>
      <main className={styles.wrapper_container}>
        <motion.div
          className={styles.text_main}
          initial={{ x: "-100%" }}
          animate={{ x: isInView ? 0 : "-100" }}
          transition={{ duration: 0.4, type: "tween" }}
        >
          <h1
            className={`${stylesGeneral.heading_secondary} ${styles.color_white}`}
          >
            Travel beyond your imagination, with trav-el-Exotica!
          </h1>
        </motion.div>
        <div className={styles.text_address}>
          <div className={styles.address_main_container}>
            <span
              className={`${stylesGeneral.body__text} ${styles.body_heading} ${styles.color_white}`}
            >
              Address
            </span>
            <span
              className={`${stylesGeneral.body__text} ${styles.color_white}`}
            >
              101 Raveline Street
            </span>
            <span
              className={`${stylesGeneral.body__text} ${styles.color_white}`}
            >
              Indore, Madhya Pradesh
            </span>
            <span
              className={`${stylesGeneral.body__text} ${styles.color_white}`}
            >
              India
            </span>
          </div>
          <div className={styles.social_media_icon_container}>
            {LOGO_ICON.map((iconName) => (
              <span className={styles.icon} key={iconName}>
                <ion-icon name={iconName}></ion-icon>
              </span>
            ))}
          </div>
        </div>
        <div className={styles.text_contact}>
          <div className={styles.contact_container}>
            <span
              className={`${stylesGeneral.body__text} ${styles.body_heading} ${styles.color_white}`}
            >
              Contact
            </span>
            <div className={styles.btn_container}>
              <Button>info@travelExotica.com</Button>
            </div>
            <span
              className={`${stylesGeneral.body__text} ${styles.contact_no} ${styles.color_white}`}
            >
              +91 <span className={styles.margin_class}>7400792226</span>
            </span>
          </div>
        </div>
      </main>
      <div className={styles.copyright}>
        <span>copyright &copy; {new Date().getFullYear()} </span>
        <span className={styles.org_name}>
          travelExotica by Rishikant Badkur
        </span>
      </div>
    </section>
  );
};

export default Footer;
