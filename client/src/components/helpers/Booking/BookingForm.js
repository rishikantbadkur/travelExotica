import stylesGeneral from "../../../styles/general.module.css";
import Button from "../../UI/Button/Button";
import styles from "./BookingForm.module.css";

import Modal from "../../UI/Modal/Modal";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";
import useCreateBooking from "../../../hooks/useCreateBooking";

const BookingForm = ({ tour }) => {
  const [
    dateInputRef,
    paymentError,
    paymentSuccess,
    paymentErrorMessage,
    errorModalCloseHandler,
    successModalCloseHandler,
    booking,
    bookingClickHandler,
    decreaseAdultHandler,
    addAdultHandler,
    decreaseChildHandler,
    addChildHandler,
    orderMutation,
    bookingError,
    bookingErrorModalCloseHandler,
    bookingMutation,
  ] = useCreateBooking(tour);

  return (
    <>
      {paymentError && (
        <Modal
          paymentModel={true}
          isOpen={paymentError}
          onClose={errorModalCloseHandler}
          modalType="error"
        >
          {paymentErrorMessage}
        </Modal>
      )}

      {paymentSuccess && (
        <Modal
          isOpen={paymentSuccess}
          paymentModel={true}
          onClose={successModalCloseHandler}
          modalType="success"
        >
          Your payment was successful. We are glad to have you onboard. A mail
          will be sent to your registered email id, post booking confirmation
          with the relevant booking details.
        </Modal>
      )}

      {bookingError && (
        <Modal
          isOpen={bookingError}
          paymentModel={true}
          onClose={bookingErrorModalCloseHandler}
          modalType="booking error"
        >
          We have successfully received your payment. However, there was an
          issue while creating your booking. Don't worry our team is already
          working on it. We will manually process your booking and confirm it
          shortly.
        </Modal>
      )}
      <div className={styles.booking_form_body}>
        <div
          className={`${styles.booking_body_container} ${styles.form_border} ${styles.body_margin}`}
        >
          <span
            className={`${stylesGeneral.body__text} ${stylesGeneral.body__text_bold}`}
          >
            Date
          </span>
          <span
            className={`${styles.tour_date_value} ${stylesGeneral.body__text}`}
          >
            <select
              onChange={(e) => {
                dateInputRef.current = e.target.value;
              }}
            >
              {tour.startDates.map((date) => (
                <option value={date} key={date}>
                  {String(new Date(date).toLocaleDateString())
                    .split("/")
                    .join("-")}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div
          className={`${styles.booking_body_adult_container} ${styles.form_border} ${styles.body_margin}`}
        >
          <div className={styles.booking_body_container}>
            <span
              className={`${stylesGeneral.body__text} ${stylesGeneral.body__text_bold}`}
            >
              Adults
            </span>
            <span
              className={`${styles.tour_date_value} ${stylesGeneral.body__text}`}
            >
              Over 18 ( <span>&#x20B9;</span>{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(tour.price)}{" "}
              )
            </span>
          </div>
          <div className={styles.counter_container}>
            <button
              className={styles.counter_btn}
              onClick={decreaseAdultHandler}
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <span className={styles.counter_value}>{booking.adult}</span>
            <button className={styles.counter_btn} onClick={addAdultHandler}>
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div
          className={`${styles.booking_body_children_container} ${styles.form_border} ${styles.body_margin}`}
        >
          <div className={styles.booking_body_container}>
            <span
              className={`${stylesGeneral.body__text} ${stylesGeneral.body__text_bold}`}
            >
              Children
            </span>
            <span
              className={`${styles.tour_date_value} ${stylesGeneral.body__text}`}
            >
              Under 18 ( <span>&#x20B9;</span>{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(Math.floor(tour.price * 0.6))}{" "}
              )
            </span>
          </div>
          <div className={styles.counter_container}>
            <button
              className={styles.counter_btn}
              onClick={decreaseChildHandler}
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <span className={styles.counter_value}>{booking.children}</span>
            <button className={styles.counter_btn} onClick={addChildHandler}>
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
        {tour.maxGroupSize === booking.adult + booking.children && (
          <p style={{ fontSize: "1.5rem", color: "red", lineHeight: "2rem" }}>
            Max Group size reached,
            <br />
            <br />
            <span style={{ fontWeight: "bolder" }}>Note :</span> If you want to
            book for an entire group, please write to us for customization,
            special offers and discounts.
          </p>
        )}

        <Button onClick={bookingClickHandler}>
          {orderMutation.status === "pending" ||
          bookingMutation.status === "pending" ? (
            <SpinnerMini />
          ) : (
            <>
              Book Now for (<span>&#x20B9;</span>&nbsp;
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(
                booking.adult * tour.price +
                  booking.children * Math.floor(tour.price * 0.6)
              )}
              )
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default BookingForm;
