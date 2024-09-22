import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

import styles from "./ContactHome.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Button from "../../UI/Button/Button";

const ContactHome = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const XImage = useTransform(scrollYProgress, [0, 0.5, 1], [50, -20, -80]);
  return (
    <section className={styles.section_wrapper}>
      <div className={styles.container_wrapper}>
        <div className={styles.text_container}>
          <div className={styles.text__subheading_container}>
            <h6 className={stylesGeneral.heading_decorative}>
              Wandering Souls
            </h6>
          </div>
          <div className={styles.text_intro__heading_container}>
            <h1 className={stylesGeneral.heading_secondary}>
              Discover Your Next Adventure
            </h1>
          </div>
          <div className={styles.text_intro__text_container}>
            <p className={stylesGeneral.body__text}>
              Whether you're planning a romantic honeymoon or a family vacation,
              our price section has got you covered. So, start browsing today
              and find the perfect vacation package at a price that won't leave
              you feeling guilty.
            </p>
          </div>
          <div className={styles.feature_bar_containers}>
            <div className={styles.feature_bar_container}>
              <p
                className={`${stylesGeneral.body__text} ${styles.margin_class}`}
              >
                Organized Group Tour
              </p>
              <div className={`${styles.progress_bar_1} `}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  viewport={{ once: true }}
                  className={styles.progress_bar_1_inner}
                  transition={{ duration: 0.8 }}
                ></motion.div>
              </div>
            </div>
            <div className={styles.feature_bar_container}>
              <p
                className={`${stylesGeneral.body__text} ${styles.margin_class}`}
              >
                Single Customized Trip
              </p>
              <div className={`${styles.progress_bar_2}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  viewport={{ once: true }}
                  className={styles.progress_bar_2_inner}
                  transition={{ duration: 0.6 }}
                ></motion.div>
              </div>
            </div>
          </div>
          <div className={styles.btn_container}>
            <Link to="/app/contacts" style={{ textDecoration: "none" }}>
              <Button>More Info</Button>
            </Link>
          </div>
        </div>

        <motion.div
          ref={ref}
          className={styles.img_container}
          style={{ x: XImage }}
        ></motion.div>
      </div>
    </section>
  );
};

export default ContactHome;
