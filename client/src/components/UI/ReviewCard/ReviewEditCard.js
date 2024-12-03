import React from "react";
import useCreateEditReview from "./useCreateEditReview";
import SpinnerMini from "../SpinnerMini/SpinnerMini";
import { Rating } from "react-simple-star-rating";

import styles from "./ReviewEditCard.module.css";
import stylesGeneral from "../../../styles/general.module.css";

function ReviewEditCard({ writeCard, editCard, reviewData }) {
  const [
    reviewText,
    ratingChangeHandler,
    reviewTextChangeHandler,
    newReviewCreateHandler,
    editReview,
    setEditReview,
    createReviewMutation,
    editReviewText,
    editReviewTextChangeHandler,
    editReviewMutation,
    updateRatingChangeHandler,
    editReviewSubmitHandler,
  ] = useCreateEditReview(
    reviewData?.tour.id,
    reviewData?.user._id,
    reviewData?.id
  );

  if (writeCard) {
    return (
      <div className={`${styles.card_container} ${styles.reviewwrite_ctn}`}>
        <div>
          <textarea
            className={`${styles.card_review_write} ${stylesGeneral.body__text}`}
            placeholder="Write a review"
            rows="5"
            maxLength="500"
            value={reviewText}
            onChange={reviewTextChangeHandler}
          ></textarea>
        </div>
        <div className={styles.card_footer}>
          <div className={styles.user_img}></div>
          <div className={styles.user_name}>
            <p className={`${stylesGeneral.body__text} ${styles.text_small}`}>
              {reviewData.user.name}
            </p>
          </div>
          <div className={styles.btn_ctn}>
            <button
              className={stylesGeneral.body__text}
              onClick={newReviewCreateHandler}
            >
              {createReviewMutation.status === "pending" ? (
                <span>
                  <SpinnerMini />
                </span>
              ) : (
                "POST"
              )}
            </button>
          </div>
        </div>
        <div className={styles.rating_ctn}>
          <Rating
            initialValue={5}
            size={16}
            onClick={(e) => {
              ratingChangeHandler(e);
            }}
          ></Rating>
        </div>
      </div>
    );
  }

  if (editCard) {
    return (
      <div className={styles.card_container}>
        {!editReview ? (
          <div className={styles.card_text}>
            <p className={stylesGeneral.body__text}>
              {reviewData.description}{" "}
            </p>
          </div>
        ) : (
          <textarea
            className={`${styles.card_review_write} ${stylesGeneral.body__text}`}
            placeholder="Edit review"
            rows="5"
            maxLength="500"
            value={editReviewText}
            onChange={editReviewTextChangeHandler}
          ></textarea>
        )}
        <div className={styles.card_footer}>
          <aside className={styles.user_img}></aside>
          <aside className={styles.user_name}>
            <p className={`${stylesGeneral.body__text} ${styles.text_small}`}>
              {reviewData.user.name}
            </p>
          </aside>
          <div className={styles.btn_ctn}>
            {editReview && (
              <button
                style={{ marginRight: "1.5rem" }}
                className={stylesGeneral.body__text}
                onClick={() => setEditReview(false)}
              >
                Cancel
              </button>
            )}

            {editReview ? (
              <button
                style={{ backgroundColor: "#434a54", color: "#fff" }}
                className={stylesGeneral.body__text}
                onClick={editReviewSubmitHandler}
              >
                Submit
              </button>
            ) : (
              <button
                className={stylesGeneral.body__text}
                onClick={() => setEditReview(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className={styles.rating_ctn}>
          <Rating
            readonly={!editReview}
            initialValue={reviewData.rating}
            size={16}
            onClick={(e) => updateRatingChangeHandler(e)}
          ></Rating>
        </div>
        {editReviewMutation.status === "pending" ? <SpinnerMini /> : undefined}
      </div>
    );
  }
}

export default ReviewEditCard;
