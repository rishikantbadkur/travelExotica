import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Dropdown.module.css";
import stylesGeneral from "../../../styles/general.module.css";

const Dropdown = memo(({ itinerary }) => {
  const [clicked, setClicked] = useState(null);

  const clickHandler = (n) => {
    if (clicked === n) {
      setClicked(null);
      return;
    }
    setClicked(n);
  };

  return (
    <section className={stylesGeneral.section_border}>
      <section className={styles.dropdown}>
        <div className={styles.dropdown_heading_container}>
          <h3 className={stylesGeneral.heading_quaternary}>Itinerary</h3>
        </div>
        <div className={styles.dropdown__body_text}>
          <p className={stylesGeneral.body__text}>
            We have carefully planned out each day to give you the best possible
            experience. From exploring historic landmarks to tasting delicious
            local cuisine, each day is packed with adventure and excitement.
            Join us as we take you on a journey through some of the most
            fascinating destinations in the world.
          </p>
        </div>
        <div className={styles.dropdown_container}>
          <ul className={styles.dropdown_list}>
            {itinerary.map((el) => {
              return (
                <li
                  key={el.day}
                  className={`${styles.dropdown_container_single} ${stylesGeneral.section_border}`}
                  onClick={() => clickHandler(el.day)}
                >
                  <div className={styles.dropdown_container__main}>
                    <span>
                      <span
                        className={`${stylesGeneral.body__text} ${stylesGeneral.body__text_bold} ${stylesGeneral.body__text_decorative}`}
                      >
                        {`DAY ${el.day} -`}
                      </span>
                      <span
                        className={`${stylesGeneral.body__text} ${stylesGeneral.body__text_bold} ${styles.line_gap}`}
                      >
                        {`  ${el.highlight}`}
                      </span>
                    </span>

                    <div className={styles.dropdown_toggle}>
                      {clicked === el.day ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {clicked === el.day && (
                      <motion.div
                        className={styles.dropdown_container__sub}
                        animate={{ height: "auto", opacity: 1 }}
                        initial={{ height: 0, opacity: 0 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "tween" }}
                      >
                        <p className={stylesGeneral.body__text}>{el.plan}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </section>
  );
});

export default Dropdown;
