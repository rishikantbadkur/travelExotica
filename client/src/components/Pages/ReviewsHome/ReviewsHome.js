import styles from "./ReviewsHome.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import ReviewCard from "../../UI/ReviewCard/ReviewCard";
import useFeatureReviews from "./useFeatureReviews";

const ReviewHome = () => {
  const [reviewsFeature, isLoading] = useFeatureReviews();

  return (
    <>
      {!isLoading && (
        <section className={styles.wrapper_container}>
          <div className={styles.reviews_body}>
            <div className={styles.body_main}>
              <h1
                className={`${stylesGeneral.heading_secondary} ${styles.color_white}`}
              >
                Unforgettable Travel Experiences
              </h1>
            </div>
            <div className={styles.body_sub}>
              <p
                className={`${stylesGeneral.body__text} ${styles.color_white}`}
              >
                Our customer's feedback is essential in building a great
                reputation and maintaining excellent service. By listening to
                our customer's needs, we can improve our offerings and provide
                an exceptional travel experience.
              </p>
            </div>
            <div className={`${styles.review_container} ${styles.color_white}`}>
              {reviewsFeature?.data.map((review) => (
                <ReviewCard
                  homePage={true}
                  reviewData={review}
                  key={review._id}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReviewHome;
