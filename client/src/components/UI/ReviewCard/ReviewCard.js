import stylesGeneral from "../../../styles/general.module.css";
import styles from "./ReviewCard.module.css";

import { Rating } from "react-simple-star-rating";

import ReviewEditCard from "./ReviewEditCard";

const ReviewCard = ({ homePage, reviewData, writeCard, editCard }) => {
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
          <div className={styles.card_text}>
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
