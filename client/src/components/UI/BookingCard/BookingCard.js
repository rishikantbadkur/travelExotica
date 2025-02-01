import styles from "./BookingCard.module.css";
import stylesGeneral from "../../../styles/general.module.css";

const BookingCard = ({ booking, contentReverse, adminCard }) => {
  const cardClass = contentReverse
    ? `${styles.card} ${styles.contentReverse}`
    : `${styles.card}`;

  return (
    <div
      className={cardClass}
      style={adminCard ? { justifyContent: "space-between" } : null}
    >
      {!adminCard && (
        <aside className={styles.img_ctn}>
          <img
            className={styles.img}
            alt={booking.tour.name}
            src={
              booking.tour.galleryImages.filter((path) =>
                path.split("/").includes("cover")
              )[0]
            }
            crossOrigin="anonymous"
          ></img>
        </aside>
      )}

      <div className={styles.body_ctn}>
        <div className={styles.text_ctn}>
          {adminCard && (
            <div className={styles.user_ctn}>
              <p className={stylesGeneral.body__text}>
                Name :{" "}
                <span style={{ color: "#000", fontWeight: "bold" }}>
                  {booking.user.name}
                </span>
              </p>
            </div>
          )}
          {adminCard && (
            <span style={{ fontSize: "1.2rem", paddingBottom: "1rem" }}>
              <span className={styles.text_color_black}>Booking Date : </span>
              {new Date(booking.createdAt)
                .toLocaleDateString()
                .split("/")
                .join("-")}
            </span>
          )}
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
            <span className={styles.text_color_black}>Tour Date : </span>
            {new Date(booking.tourDate)
              .toLocaleDateString()
              .split("/")
              .join("-")}
          </span>
        </div>
      </div>

      {!adminCard && (
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
      )}
      {!adminCard ? (
        booking.paid === "confirmed" ? (
          <span className={`${styles.booking_status} ${styles.color_confirm}`}>
            Confirmed
          </span>
        ) : (
          <span className={`${styles.booking_status} ${styles.color_pending}`}>
            In Progress
          </span>
        )
      ) : booking.active ? (
        <span className={`${styles.booking_status} ${styles.color_confirm}`}>
          Active
        </span>
      ) : (
        <span className={`${styles.booking_status} ${styles.color_cancel}`}>
          Cancelled
        </span>
      )}
    </div>
  );
};

export default BookingCard;
