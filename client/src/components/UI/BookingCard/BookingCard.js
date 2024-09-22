import styles from "./BookingCard.module.css";
import stylesGeneral from "../../../styles/general.module.css";

const BookingCard = ({ booking, contentReverse }) => {
  const cardClass = contentReverse
    ? `${styles.card} ${styles.contentReverse}`
    : `${styles.card}`;

  return (
    <div className={cardClass}>
      <aside className={styles.img_ctn}>
        <img
          className={styles.img}
          alt={booking.tour.name}
          src={`/assets/images/tours/${booking.tour.name}/cover.jpg`}
        ></img>
      </aside>
      <div className={styles.body_ctn}>
        <div className={styles.text_ctn}>
          <span
            className={`${stylesGeneral.body__text} ${styles.custom_text_style}`}
          >
            {booking.tour.name}
          </span>
          <aside
            className={`${stylesGeneral.body__text} ${styles.text_booking_ctn} ${styles.font_text}`}
          >
            <p>
              <span className={styles.text_color_black}>Adult :</span>{" "}
              {booking.bookingData.adult}
            </p>
            <p>
              <span className={styles.text_color_black}>Children :</span>{" "}
              {booking.bookingData.children}
            </p>
          </aside>
          <span className={`${stylesGeneral.body__text} ${styles.font_text}`}>
            <span className={styles.text_color_black}>Date : </span>
            {new Date(booking.tourDate)
              .toLocaleDateString()
              .split("/")
              .join("-")}
          </span>
        </div>
      </div>
      <div className={`${styles.body_spec} ${stylesGeneral.body__text}`}>
        <p>
          <span className={styles.text_color_black}>Duration : </span>
          {booking.tour.duration}
        </p>
        <p>
          <span className={styles.text_color_black}>Difficulty :</span>{" "}
          {booking.tour.difficulty}
        </p>
        <p>
          <span className={styles.text_color_black}>Group Size: </span>
          {booking.tour.maxGroupSize}
        </p>
      </div>
      {booking.paid === "confirmed" ? (
        <span className={`${styles.booking_status} ${styles.color_confirm}`}>
          Confirmed
        </span>
      ) : (
        <span className={`${styles.booking_status} ${styles.color_pending}`}>
          In Progress
        </span>
      )}
    </div>
  );
};

export default BookingCard;
