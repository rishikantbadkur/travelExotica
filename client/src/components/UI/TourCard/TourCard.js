import { motion } from "framer-motion";

import styles from "./TourCard.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const TourCard = ({
  destinations,
  startLocation,
  tour,
  adminCard,
  onClick,
}) => {
  const { name, price, duration, summary, startDates, galleryImages } = tour;

  const coverImg = galleryImages.find((img) =>
    img.split("/").includes("cover")
  );

  const tourDate = new Date(startDates[0]).toDateString().split(" ");
  const tourMonth = tourDate[1];
  const tourYear = tourDate[3];

  const displayDate = [tourMonth, tourYear].join(" ");

  return (
    <motion.div className={styles.card_container}>
      <div className={styles.card_img_box}>
        <img
          className={styles.card_img}
          src={coverImg}
          alt={name}
          crossOrigin="anonymous"
        ></img>
        <aside className={styles.img_text}>
          <ion-icon name="time"></ion-icon>
          <p className={styles.text_days}>{`${duration} days`}</p>
        </aside>
      </div>

      <div className={styles.description_box}>
        <aside className={styles.description_item}>
          <ion-icon name="flag"></ion-icon>
          <span>{`${destinations} stops`}</span>
        </aside>
        <aside className={styles.description_item}>
          <ion-icon name="calendar-clear"></ion-icon>
          <span>{displayDate}</span>
        </aside>
        <aside className={styles.description_item}>
          <ion-icon name="location"></ion-icon>
          <span>{startLocation}</span>
        </aside>
      </div>
      <div className={styles.section_body_container}>
        <div className={styles.section_body}>
          <div
            className={`${styles.body_header} ${stylesGeneral.section_border} `}
          >
            <p>{name}</p>
            <div className={styles.rating_ctn}>
              <Rating
                initialValue={tour.ratingsAverage}
                allowFraction={true}
                readonly={true}
                size={16}
              ></Rating>
            </div>
          </div>

          {!adminCard && (
            <div
              className={`${styles.body_main} ${stylesGeneral.body__text} ${stylesGeneral.section_border}`}
            >
              <p>{summary}</p>
            </div>
          )}
          <div className={styles.body_footer}>
            {adminCard ? (
              <Button onClick={() => onClick(tour)}>Edit</Button>
            ) : (
              <Link
                to={`/app/tours/${tour._id}/${tour.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Button>Details</Button>
              </Link>
            )}

            <aside>
              <span
                className={`${styles.price_tag_secondary} ${stylesGeneral.body__text}`}
              >
                from
              </span>
              <div className={styles.price_value}>
                <span className={styles.price_value_sign}>&#x20B9;</span>
                <span className={styles.price_value_number}> {price}</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
