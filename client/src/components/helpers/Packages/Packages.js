import styles from "./Packages.module.css";
import Header from "../../Pages/Header/Header";
import Footer from "../../Pages/Footer/Footer";
import TourFilterForm from "../TourFilterForm/TourFilterForm";
import TourData from "../TourData/TourData";
import useTitle from "../../../hooks/useTitle";
import useWindowScroll from "../../../hooks/useWindowScroll";
import useTourFilter from "./useTourFilter";

const Packages = () => {
  useWindowScroll();
  useTitle("All Tours");

  const [
    filteredOptions,
    tourNillFlag,
    tourData,
    error,
    isError,
    filteredTours,
    isLoading,
    handleDifficultyChange,
    handlePriceChange,
    handleDurationChange,
    handleTypologiesChange,
    handleDestinationChange,
    handleSortByChange,
    pageCount,
    setPageCount,
  ] = useTourFilter();

  return (
    <>
      <Header />
      <section className={styles.packages}>
        <div className={styles.img_container}>
          <h1 className={styles.text_main}>Our Packages</h1>
        </div>
        <div className={styles.body_container}>
          <TourFilterForm
            price={filteredOptions.price}
            onDestinationChange={(e) => handleDestinationChange(e)}
            onPriceChange={(e) => handlePriceChange(e)}
            onDurationChange={(e) => handleDurationChange(e)}
            onTypologiesChange={(e) => handleTypologiesChange(e)}
            onDifficultyChange={(e) => handleDifficultyChange(e)}
            onSortByChange={(e) => handleSortByChange(e)}
          />
          <TourData
            tourNillFlag={tourNillFlag}
            tourData={tourData?.data?.tours}
            isLoading={isLoading}
            error={error}
            isError={isError}
            filteredTours={filteredTours}
            pageCount={pageCount}
            setPageCount={setPageCount}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Packages;
