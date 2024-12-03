import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./FeaturedReviews.module.css";

import useFeatureReviews from "../../../ReviewsHome/useFeatureReviews";
import ReviewCard from "../../../../UI/ReviewCard/ReviewCard";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import { updateFeatureReviews } from "../../../../../features/adminApi/reviewFeatures";
import toast from "react-hot-toast";

function FeaturedReviews() {
  const [reviewsFeature, isLoading] = useFeatureReviews();

  const queryClient = useQueryClient();

  const reviewsMutation = useMutation({
    mutationFn: updateFeatureReviews,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Removed Successfully");
        queryClient.invalidateQueries("featureReviews");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const featureReviewRemoveHandler = (reviewId) => {
    const flag = window.confirm(
      "Are you sure you want to remove this review from the feature list?"
    );

    if (!flag) return;

    reviewsMutation.mutate({ reviewId: reviewId, update: { feature: false } });
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : (
        <div className={styles.ctn}>
          <h2 className={styles.text_ctn}>Featured Reviews</h2>
          <div className={styles.review_ctn}>
            {reviewsFeature?.data.map((review) => (
              <ReviewCard
                reviewData={review}
                adminCard={true}
                key={review._id}
                onRemoveFromFeature={featureReviewRemoveHandler}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FeaturedReviews;
