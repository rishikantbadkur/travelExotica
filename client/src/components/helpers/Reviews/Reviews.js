import stylesGeneral from "../../../styles/general.module.css";
import ReviewCard from "../../UI/ReviewCard/ReviewCard";

import styles from "./Reviews.module.css";

import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";
import usePostReviewCriteria from "./usePostReviewCriteria";

function Reviews({ tourName, tourId }) {
  const [
    reviewsData,
    userState,
    isLoading,
    userReview,
    isUserEligibleToReview,
  ] = usePostReviewCriteria(tourName, tourId);

  return (
    <>
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <section className={styles.review_ctn}>
          <h2
            className={`${stylesGeneral.heading_decorative} ${styles.heading_custom}`}
          >
            Hear from the fellow travellers...
          </h2>

          {reviewsData?.data.length === 0 ? (
            <p
              className={stylesGeneral.body__text}
              style={{
                // marginLeft: "auto",
                // marginRight: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No reviews yet, take a trip and be the first to review.
            </p>
          ) : (
            <div className={styles.review_body}>
              {reviewsData?.data.map((review, index) => (
                <ReviewCard reviewData={review} key={index} />
              ))}

              {userState?.authenticated &&
                userState?.user.length > 0 &&
                isUserEligibleToReview &&
                !userReview && (
                  <ReviewCard
                    reviewData={{
                      user: {
                        name: userState?.user[0]?.name,
                        _id: userState?.user[0]?._id,
                      },

                      tour: {
                        id: tourId,
                      },
                    }}
                    writeCard={true}
                  />
                )}
              {userState?.authenticated &&
                userState?.user.length > 0 &&
                !!userReview && (
                  <ReviewCard
                    reviewData={{
                      user: {
                        name: userState?.user[0]?.name,
                        _id: userState?.user[0]?._id,
                      },
                      description: userReview?.description,
                      rating: userReview?.rating,
                      tour: {
                        id: tourId,
                      },
                      id: userReview?.id,
                    }}
                    editCard={true}
                  ></ReviewCard>
                )}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default Reviews;
