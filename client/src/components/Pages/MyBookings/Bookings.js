import { Link } from "react-router-dom";
import BookingCard from "../../UI/BookingCard/BookingCard";
import Footer from "../Footer/Footer";
import styles from "./Bookings.module.css";

import { AnimatePresence, motion } from "framer-motion";
import useWindowScroll from "../../../hooks/useWindowScroll";
import useTitle from "../../../hooks/useTitle";

const Bookings = ({ bookings }) => {
  useWindowScroll();
  useTitle("My Bookings");

  useTitle("My Bookings");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariantsleft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const itemVariantsright = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className={styles.text_head_ctn}>
        <p>
          Your Booking <span style={{ color: "#ffd205" }}>activity</span>
        </p>
      </div>
      <section className={styles.wrapper}>
        <motion.ul
          className={styles.ctn_wrap}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          layout
        >
          <AnimatePresence>
            {bookings.map((booking, index) => (
              <motion.li
                variants={
                  (index + 1) % 2 === 0 ? itemVariantsleft : itemVariantsright
                }
                key={booking._id}
                layout
              >
                <Link
                  to={`/app/tours/${booking.tour._id}/${booking.tour.slug}`}
                  state={{ id: booking.tour.id }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <BookingCard
                    booking={booking}
                    contentReverse={(index + 1) % 2 === 0}
                  ></BookingCard>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Bookings;
