import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TourCard from "../TourCard/TourCard";
import styles from "./Pagination.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import SpinnerMini from "../SpinnerMini/SpinnerMini";

function Pagination({ tours, length, pageCount, setPageCount }) {
  const [loading, setLoading] = useState(false);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const numPages = Math.ceil(tours.length / length);

  const ftours = tours.slice((pageCount - 1) * length, length * pageCount);

  const handlePageChange = (e) => {
    setLoading(true);
    setTimeout(() => {
      setPageCount(e.target.value);
      setLoading(false);
    }, 10);
  };

  const ToggleBtns = (
    <div className={styles.btn_ctn}>
      {Array.from({ length: numPages })
        .fill(1)
        .map((value, index) => (
          <button
            className={
              (index + 1) * 1 === pageCount * 1
                ? `${styles.btn} ${stylesGeneral.body__text} ${styles.active}`
                : `${styles.btn} ${stylesGeneral.body__text}`
            }
            key={index}
            value={index + 1}
            onClick={handlePageChange}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );

  return (
    <>
      {loading ? (
        <>
          <section className={styles.sec_ctn}>
            <SpinnerMini></SpinnerMini>
          </section>
          {ToggleBtns}
        </>
      ) : (
        <>
          <section className={styles.sec_ctn}>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={styles.body_container_main}
              style={{ listStyle: "none" }}
            >
              <AnimatePresence>
                {ftours.map((tour) => (
                  <motion.li key={tour._id} variants={itemVariants}>
                    <TourCard
                      tour={tour}
                      destinations={tour.locations.length}
                      startLocation={tour.startLocation.address}
                    ></TourCard>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </section>
          {ToggleBtns}
        </>
      )}
    </>
  );
}

export default Pagination;
