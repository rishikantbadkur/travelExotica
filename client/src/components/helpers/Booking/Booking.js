import { useState } from "react";
import stylesGeneral from "../../../styles/general.module.css";
import styles from "./Booking.module.css";
import BookingForm from "./BookingForm";
import EnquiryForm from "./EnquiryForm";

const Booking = ({ tour }) => {
  const [bookingFormToggle, setBookingFormToggle] = useState(true);
  const [enquiryFormToggle, setEnquiryFormToggle] = useState(false);

  const toggleBookingFormHandler = () => {
    setEnquiryFormToggle(false);
    setBookingFormToggle(true);
  };

  const toggleEnquiryFormHandler = () => {
    setBookingFormToggle(false);
    setEnquiryFormToggle(true);
  };

  return (
    <section className={styles.booking_form}>
      <div className={styles.form_container}>
        <div className={`${styles.form_header} ${styles.form_border}`}>
          <div className={styles.price_tag}>
            <span className={stylesGeneral.body__text}>Price</span>
            <span
              className={`${styles.price_tag_secondary} ${stylesGeneral.body__text} ${stylesGeneral.body__text_bold}`}
            >
              from
            </span>
          </div>
          <div className={styles.price_value}>
            <span className={styles.price_value_sign}>&#x20B9;</span>
            <span className={styles.price_value_number}>
              {" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(tour.price)}{" "}
            </span>
            <p style={{ fontSize: "1.4rem", marginTop: "0.8rem" }}>
              per Person{" "}
            </p>
          </div>
        </div>
        <div className={`${styles.form_switch} ${styles.form_border}`}>
          <button
            className={
              bookingFormToggle
                ? `${styles.form_switch_booking} ${styles.form_selected}`
                : `${styles.form_switch_booking}`
            }
            onClick={toggleBookingFormHandler}
          >
            Booking Form
          </button>
          <span className={styles.partition}></span>

          <button
            className={
              enquiryFormToggle
                ? `${styles.form_switch_enquiry} ${styles.form_selected}`
                : `${styles.form_switch_enquiry}`
            }
            onClick={toggleEnquiryFormHandler}
          >
            Enquiry Form
          </button>
        </div>

        {bookingFormToggle && <BookingForm tour={tour}></BookingForm>}
        {enquiryFormToggle && <EnquiryForm tour={tour}></EnquiryForm>}
      </div>
    </section>
  );
};

export default Booking;
