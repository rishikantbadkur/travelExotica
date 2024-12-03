import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./ReviewInfo.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";

import { updateFeatureReviews } from "../../../../../features/adminApi/reviewFeatures";

import Button from "../../../../UI/Button/Button";
import toast from "react-hot-toast";

function ReviewInfo({ review, setShowSingleReview }) {
  const queryClient = useQueryClient();

  const reviewsMutation = useMutation({
    mutationFn: updateFeatureReviews,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Added Successfully");
        queryClient.invalidateQueries("featureReviews", "All Reviews");
        setShowSingleReview(false);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const btnClickHandler = (reviewId) => {
    const flag = window.confirm(
      "Are you sure you want to add this review to the feature review list?"
    );

    if (!flag) return;

    reviewsMutation.mutate({ reviewId: reviewId, update: { feature: true } });
  };

  return (
    <div className={styles.booking_display_ctn}>
      <div className={styles.display_card_ctn}>
        {review.feature === true && (
          <span className={`${styles.role_ctn} ${styles.review_active}`}>
            Featured
          </span>
        )}

        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Tour : </p>
          <p>{review.tour.name}</p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Review: </p>
          <p>{review.description}</p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Name : </p>
          <p>{review.user.name}</p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Email : </p>
          <p>{review.user.email}</p>
        </div>

        <div
          className={`${styles.data_ctn} ${stylesGeneral.body__text}`}
          style={{ marginTop: "1.6rem" }}
        >
          <p className={styles.text_custom}>Review Date : </p>
          <p>
            {new Date(review.createdAt)
              .toLocaleDateString()
              .split("/")
              .join("-")}
          </p>
        </div>
        <div className={styles.btn_ctn}>
          {!review.feature && (
            <Button btnSub={true} onClick={() => btnClickHandler(review._id)}>
              Feature
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewInfo;
