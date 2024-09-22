import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import stylesGeneral from "../../../styles/general.module.css";
import styles from "./ServicesHome.module.css";
import Button from "../../UI/Button/Button";

const SERVICES_FEATURES_LIST = [
  "Connect with nature",
  "Experience other cultures",
  "Create unforgettable memories",
];

const SECTION_MAIN = "Embrace the Thrill of the Unknown";

const SECTION_BODY =
  "Are you tired of the typical tourist destinations and looking to step out of your comfort zone? Adventure travel may be the perfect solution for you! Here are four reasons why you should book an adventure travel experience :";

const ServicesHome = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 0.5, 1], [-200, -100, 0]);

  return (
    <section className={styles.wrapper_container}>
      <div className={styles.wrapper_container_body}>
        <div className={styles.container_img}>
          <motion.div
            ref={ref}
            style={{ y: yImage }}
            className={`${styles.container_img_wrapper} ${styles.img_1}`}
          ></motion.div>
        </div>
        <div className={styles.container_text}>
          <div className={styles.text_sub_container}>
            <h6
              className={`${stylesGeneral.heading_decorative} ${styles.color_white}`}
            >
              Adventure Travel
            </h6>
          </div>
          <div className={styles.text_main_container}>
            <h1
              className={`${stylesGeneral.heading_secondary} ${styles.color_white}`}
            >
              {SECTION_MAIN}
            </h1>
          </div>
          <div className={styles.text_body__container}>
            <p className={`${stylesGeneral.body__text} ${styles.color_white}`}>
              {SECTION_BODY}
            </p>
          </div>
          <div className={styles.list_container}>
            <ul className={styles.list}>
              {SERVICES_FEATURES_LIST.map((feature, index) => (
                <li
                  className={`${styles.list_item} ${styles.item_border}`}
                  key={index}
                >
                  <span className={`${styles.icon} ${styles.color_white}`}>
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                  </span>
                  <span>
                    <p
                      className={`${stylesGeneral.body__text} ${styles.color_white}`}
                    >
                      {feature}
                    </p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.btn_container}>
            <Link
              to="/app/services"
              style={{ textDecoration: "none", zIndex: 99 }}
            >
              <Button>All Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHome;
