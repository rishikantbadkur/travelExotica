import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import styles from "./Blogs.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserContext } from "../../users/UserProvider";

function Blogs() {
  const { userState } = useContext(UserContext);

  const navigate = useNavigate();

  if (userState?.user.length === 0) {
    navigate("/app/login");
    return;
  }
  return (
    <>
      <Header />
      <section className={styles.wrapper}>
        <motion.div
          className={styles.ctn}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.text_main}>
            We are <span style={{ color: "#ffd205" }}>currently</span> working
            on this and it will be available soon.
          </p>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}

export default Blogs;
