import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./Hero.module.css";
import stylesGeneral from "../../../styles/general.module.css";

const Hero = () => {
  const [view, setView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleResize(params) {
      if (window.innerWidth < 900) {
        setView(true);
      }
      if (window.innerWidth > 900) {
        setView(false);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yImage1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 150, 250]);
  const yImage2 = useTransform(scrollYProgress, [0, 0.5, 1], [20, -30, -60]);

  let element1;
  let element2;

  if (window.innerWidth < 900 || view === true) {
    element1 = (
      <motion.div
        className={`${styles.section__hero_img} ${styles.hero_img1}`}
      ></motion.div>
    );

    element2 = (
      <motion.div
        className={`${styles.section__hero_img} ${styles.hero_img2}`}
      ></motion.div>
    );
  } else {
    element1 = (
      <motion.div
        style={{ y: yImage1 }}
        transition={{ duration: 2000 }}
        className={`${styles.section__hero_img} ${styles.hero_img1}`}
      ></motion.div>
    );

    element2 = (
      <motion.div
        style={{ y: yImage2 }}
        className={`${styles.section__hero_img} ${styles.hero_img2}`}
      ></motion.div>
    );
  }

  return (
    <div className={styles.wrapper_box}>
      <section className={styles.section__hero} ref={ref}>
        <div className={styles.section__hero__text}>
          <h1
            className={`${stylesGeneral.animate_left} ${stylesGeneral.heading_primary} `}
          >
            <span
              className={`${styles.hero_underline__text} ${styles.text_main}`}
            >
              Loose
            </span>{" "}
            Yourself
          </h1>

          <p
            className={`${stylesGeneral.animate_right} ${stylesGeneral.heading_primary__sub} `}
          >
            to{" "}
            <span
              className={`${styles.hero_underline__text} ${styles.text_sub}`}
            >
              find
            </span>{" "}
            Yourself
          </p>
          <Link
            className={`${stylesGeneral.btn} ${styles.hero_btn} ${stylesGeneral.btn_animated}`}
            to="/app/tours"
          >
            Explore Now
          </Link>
        </div>

        <div className={styles.section__hero_imgBox}>
          {element1}
          {element2}
        </div>
      </section>
    </div>
  );
};

export default Hero;
