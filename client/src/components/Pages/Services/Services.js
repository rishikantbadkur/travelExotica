import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FEATURES_LIST } from "./staticData";
import stylesGeneral from "../../../styles/general.module.css";
import styles from "./Services.module.css";
import ContactForm from "../../helpers/ContactForm/ContactForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import useTitle from "../../../hooks/useTitle";
import useWindowScroll from "../../../hooks/useWindowScroll";

const Services = () => {
  useTitle("Services");
  useWindowScroll();

  const ref = useRef(null);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const yImage1 = useTransform(scrollY, [100, 750, 1050], [0, 150, 200]);
  const yImage2 = useTransform(scrollY, [100, 750, 1050], [200, 100, 50]);
  const yImage3 = useTransform(scrollY, [100, 750, 1050], [0, 25, 50]);
  const ximage4 = useTransform(scrollY, [300, 750, 1450], [0, 55, 110]);
  const scaleImage2 = useTransform(scrollY, [100, 750, 1050], [1, 1.3, 1.4]);

  const scaleImageServices = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 1.2]
  );

  let elementImage = (
    <div className={styles.services_main_img}>
      <motion.div
        ref={ref}
        style={{ y: yImage1 }}
        className={`${styles.main_img_container} ${styles.main_img_1}`}
      ></motion.div>
      <motion.div
        style={{ y: yImage2, scale: scaleImage2 }}
        className={`${styles.main_img_container} ${styles.main_img_2}`}
      ></motion.div>
      <motion.div
        style={{ y: yImage3 }}
        className={`${styles.main_img_container} ${styles.main_img_3}`}
      ></motion.div>
      <motion.div
        style={{ x: ximage4 }}
        className={`${styles.main_img_container} ${styles.main_img_4}`}
      ></motion.div>
    </div>
  );
  return (
    <>
      <Header />
      <section className={styles.services}>
        <div className={styles.img_container}>
          <h1 className={styles.text_main}>Services</h1>
        </div>

        <div className={styles.services_main}>
          <div className={styles.services_main_text}>
            <h6
              className={`${stylesGeneral.heading_decorative} ${styles.services_body_margin}`}
            >
              Tourist Hotspots
            </h6>
            <h1
              className={`${stylesGeneral.heading_secondary} ${styles.services_body_margin}`}
            >
              Trip Planning for the Best Travel Experience Possible
            </h1>
            <article className={stylesGeneral.body__text}>
              <p>
                Welcome to trav-el-exotica, where we specialize in providing our
                clients with unforgettable travel experiences.Whether you're
                looking to relax on a tropical beach or embark on a cultural
                adventure, we can help you plan your dream vacation. From
                flights and accommodations to tours and activities, we'll handle
                all the details, so you can focus on making memories.
              </p>
              <br></br>

              <ul className={styles.margin_class_left}>
                <li>
                  <p>
                    We offer a wide range of travel tours to destinations all
                    over the world.
                  </p>
                </li>
                <br></br>
                <li>
                  <p>
                    Our travel agents are available to assist you every step of
                    the way.
                  </p>
                </li>
              </ul>
            </article>
            <div className={`${styles.services_btn_container}`}>
              <a className={stylesGeneral.btn} href="/services">
                Read More
              </a>
            </div>
          </div>
          {elementImage}
        </div>
        <main className={styles.features}>
          <div className={styles.features_header}>
            <h6
              className={`${stylesGeneral.heading_decorative} ${styles.services_body_margin}`}
            >
              Let us help you plan your next adventure
            </h6>
            <h1
              className={`${stylesGeneral.heading_tertiary} ${styles.services_body_margin}`}
            >
              Perfect Vacation come True
            </h1>
          </div>
          <div className={styles.features_container}>
            <ul className={styles.features_list_item}>
              {FEATURES_LIST.map((feature, i) => (
                <li key={feature.title}>
                  <div className={styles.feature_box}>
                    <img
                      className={`${styles.feature_img} ${styles.services_body_margin}`}
                      src={`/assets/features/features_${i + 1}.png`}
                      alt={feature.title}
                    ></img>
                    <p
                      className={`${stylesGeneral.body__text} ${stylesGeneral.body__text_bold} ${styles.services_body_margin} ${styles.services_body_font_big}`}
                    >
                      {feature.title}
                    </p>
                    <p className={stylesGeneral.body__text}>
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <div className={styles.contacts_header}>
          <h6
            className={`${stylesGeneral.heading_decorative} ${styles.services_body_margin}`}
          >
            Personalized Trips
          </h6>
          <h1
            className={`${stylesGeneral.heading_tertiary} ${styles.services_body_margin}`}
          >
            Contact us for a Quote
          </h1>
        </div>
        <div className={styles.contacts_form_container}>
          <div className={styles.contacts_form_img_container} ref={ref}>
            <motion.img
              style={{ scale: scaleImageServices }}
              alt=""
              src={require("../../../assets/images/contacts/contact_sub.jpeg")}
              className={styles.contacts_form_img}
            ></motion.img>
          </div>

          <div className={styles.contacts_form}>
            <ContactForm></ContactForm>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
