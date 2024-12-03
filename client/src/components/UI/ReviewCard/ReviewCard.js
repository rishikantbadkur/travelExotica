import stylesGeneral from "../../../styles/general.module.css";
import styles from "./ReviewCard.module.css";

import { Rating } from "react-simple-star-rating";

import ReviewEditCard from "./ReviewEditCard";

const ReviewCard = ({
  homePage,
  reviewData,
  writeCard,
  editCard,
  adminCard,
  onRemoveFromFeature,
  adminViewCard,
}) => {
  const home = homePage || false;

  return (
    <>
      {writeCard || editCard ? (
        <ReviewEditCard
          writeCard={writeCard}
          editCard={editCard}
          reviewData={reviewData}
        />
      ) : (
        <div
          className={styles.card_container}
          style={home ? { backgroundColor: "#1bbc9b" } : {}}
        >
          {adminCard && (
            <div
              className={styles.remove_ctn}
              onClick={() => onRemoveFromFeature(reviewData._id)}
            >
              <ion-icon name="remove-circle"></ion-icon>
            </div>
          )}
          <div className={styles.card_text}>
            {adminViewCard && (
              <div className={`${styles.tour_ctn} ${stylesGeneral.body__text}`}>
                <p>{reviewData.tour.name}</p>
              </div>
            )}
            <p className={stylesGeneral.body__text}>
              {reviewData.description}{" "}
            </p>
          </div>

          <div className={styles.card_footer}>
            <aside className={styles.user_img}></aside>
            <aside className={styles.user_name}>
              <p className={`${stylesGeneral.body__text} ${styles.text_small}`}>
                {reviewData.user.name}
              </p>
            </aside>
          </div>
          <div className={styles.rating_ctn}>
            <Rating
              readonly={true}
              initialValue={reviewData.rating}
              allowFraction={true}
              size={16}
            ></Rating>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
