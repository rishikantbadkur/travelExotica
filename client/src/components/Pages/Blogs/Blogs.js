import React, { useContext } from "react";
import { motion } from "framer-motion";

import styles from "./Blogs.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserContext } from "../../users/UserProvider";
import useWindowScroll from "../../../hooks/useWindowScroll";
import useTitle from "../../../hooks/useTitle";

function Blogs() {
  const { userState } = useContext(UserContext);

  useWindowScroll();
  useTitle("Blogs");

  if (userState?.user.length === 0) {
    window.location.href = "/app/login";
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
