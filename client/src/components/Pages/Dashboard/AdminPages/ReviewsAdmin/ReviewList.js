import ReviewCard from "../../../../UI/ReviewCard/ReviewCard";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import styles from "./ReviewList.module.css";
import useReviewsData from "./useReviewsData";

function ReviewList({ onSingleReviewClick, setSingleReviewLoading }) {
  const [
    reviewsData,
    isReviewsDataLoading,
    reviewsDataLoadError,
    pageCount,
    setPageCount,
  ] = useReviewsData();

  return (
    <>
      {isReviewsDataLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : reviewsDataLoadError ? (
        <div className={styles.load_error}>
          <p>{reviewsDataLoadError.message}</p>
        </div>
      ) : (
        <section>
          <h2 className={styles.text_ctn}>All Reviews</h2>
          <div className={styles.ctn_main}>
            <div className={styles.paginate_ctn}>
              <span style={{ letterSpacing: "0.5px" }}>
                <p>
                  Showing{" "}
                  {(reviewsData.pagination.currentPage - 1) *
                    reviewsData.pagination.resultsPerPage +
                    1}{" "}
                  -{" "}
                  {reviewsData.pagination.currentPage ===
                  reviewsData.pagination.totalPages
                    ? reviewsData.pagination.resultsPerPage *
                        (reviewsData.pagination.currentPage - 1) +
                      reviewsData.results
                    : reviewsData.pagination.resultsPerPage *
                      reviewsData.pagination.currentPage}{" "}
                  of {reviewsData.pagination.totalReviews} results
                </p>
              </span>
              <span style={{ letterSpacing: "0.5px" }}>
                <p>
                  Page {reviewsData.pagination.currentPage} of{" "}
                  {reviewsData.pagination.totalPages}
                </p>
              </span>
            </div>
            <div className={styles.booking_list_ctn}>
              {reviewsData.data.map((review) => (
                <div
                  className={styles.review_card_ctn}
                  key={review._id}
                  onClick={() => {
                    setSingleReviewLoading(true);
                    setTimeout(() => {
                      setSingleReviewLoading(false);
                      onSingleReviewClick(review);
                    }, 200);
                  }}
                >
                  <ReviewCard reviewData={review} adminViewCard={true} />
                </div>
              ))}
            </div>
            {
              <div className={styles.btn_ctn}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    if (pageCount === 1) {
                      return;
                    }

                    setPageCount((prev) => prev - 1);
                  }}
                >
                  Prev
                </button>

                <button
                  className={styles.btn}
                  onClick={() => {
                    if (pageCount === reviewsData.pagination.totalPages) {
                      return;
                    }
                    setPageCount((prev) => prev + 1);
                  }}
                >
                  Next
                </button>
              </div>
            }
          </div>
        </section>
      )}
    </>
  );
}

export default ReviewList;
