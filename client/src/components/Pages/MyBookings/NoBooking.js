import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../UI/Button/Button";
import styles from "./NoBooking.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Footer from "../Footer/Footer";

const NoBooking = () => {
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <section className={styles.wrapper}>
        <motion.div
          className={styles.container}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <div className={`${styles.text_heading} `}>
            <div className={styles.text_nobooking}>
              <p className={`${stylesGeneral.body__text} ${styles.text_main}`}>
                No bookings <span style={{ color: "#ffd205" }}>yet</span>
              </p>
              <br />{" "}
              <p className={stylesGeneral.heading_decorative}>
                Check out our available tours and plan your next adventure!
              </p>
              <span style={{ display: "inline-block", marginTop: "4rem" }}>
                <Button
                  btnSub={true}
                  onClick={() => {
                    navigate("/app/tours");
                  }}
                >
                  ALL TOURS
                </Button>
              </span>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default NoBooking;
