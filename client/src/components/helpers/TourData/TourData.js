import styles from "./TourData.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import ErrorPage from "../../UI/Error/ErrorPage";
import stylesGeneral from "../../../styles/general.module.css";
import Pagination from "../../UI/Pagination/Pagination";

function TourData({
  isError,
  isLoading,
  tourData,
  error,
  filteredTours,
  tourNillFlag,
  pageCount,
  setPageCount,
}) {
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error || isError) {
    return <ErrorPage message={error.message}></ErrorPage>;
  }

  if (filteredTours) {
    return (
      <section className={styles.tour_data}>
        {tourNillFlag && (
          <div className={styles.text_notours}>
            <span
              className={`${stylesGeneral.heading_decorative} ${styles.text_bold}`}
            >
              No Search results
            </span>
            <span className={stylesGeneral.heading_quaternary}>
              You may also like:
            </span>
          </div>
        )}
        <Pagination
          tours={filteredTours}
          length={4}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
      </section>
    );
  }

  return (
    <section className={styles.tour_data}>
      <Pagination tours={tourData} length={4} />
    </section>
  );
}

export default TourData;
