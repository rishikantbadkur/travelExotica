import styles from "./ReviewsAdmin.module.css";
import ReviewStat from "./ReviewStat";
import ReviewsBarGraph from "./ReviewsBarGraph";
import FeaturedReviews from "./FeaturedReviews";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import useBookingStatData from "../BookingsAdmin/useBookingStatData";
import ReviewList from "./ReviewList";
import useReviewsStatData from "./useReviewsStatData";
import ReviewInfo from "./ReviewInfo";
import { useState } from "react";

function ReviewsAdmin() {
  const [showSingleReview, setShowSingleReview] = useState(false);
  const [singleReviewData, setSingleReviewData] = useState(null);
  const [singleReviewLoading, setSingleReviewLoading] = useState(false);
  const [reviewsStatData, isReviewsStatDataLoading, reviewsStatDataLoadError] =
    useReviewsStatData();

  const [
    ,
    ,
    ,
    ,
    bookingsStatData,
    isBookingsStatDataLoading,
    bookingsStatLoadError,
  ] = useBookingStatData();

  const singleReviewClickHandler = (review) => {
    setShowSingleReview(true);
    setSingleReviewData(review);
  };

  return (
    <>
      {isReviewsStatDataLoading || isBookingsStatDataLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : reviewsStatDataLoadError || bookingsStatLoadError ? (
        <div className={styles.load_error}>
          {reviewsStatDataLoadError.message}
        </div>
      ) : (
        <section className={styles.wrapper}>
          <div className={styles.section_head}>
            <h2>Overview - Reviews</h2>
          </div>
          <div className={styles.stat_main_ctn}>
            <div className={styles.stat_ctn}>
              <ReviewStat
                reviews={reviewsStatData}
                totalBookings={bookingsStatData.totalBookings}
              />
            </div>
            <div className={styles.bargraph_ctn}>
              <ReviewsBarGraph reviews={reviewsStatData.data.reviews} />
            </div>
          </div>
          <div className={styles.feature_review_ctn}>
            <FeaturedReviews />
          </div>
          <div className={styles.review_list_ctn}>
            <ReviewList
              onSingleReviewClick={singleReviewClickHandler}
              setSingleReviewLoading={setSingleReviewLoading}
            />
            {showSingleReview && !!singleReviewData && (
              <ReviewInfo
                review={singleReviewData}
                setShowSingleReview={setShowSingleReview}
              />
            )}
            {singleReviewLoading && (
              <div className={styles.loading}>
                <SpinnerMedium />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default ReviewsAdmin;
