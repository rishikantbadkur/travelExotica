import { AnimatePresence, motion } from "framer-motion";

import useTourFilter from "../../../../helpers/Packages/useTourFilter";
import Button from "../../../../UI/Button/Button";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import styles from "./ToursAdmin.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";
import TourCard from "../../../../UI/TourCard/TourCard";
import StatBox from "../UI/StatBox/StatBox";
import { Rating } from "react-simple-star-rating";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../../../../../features/apiFearures/toursApiFeatures";
import FeaturedTours from "./FeaturedTours";
import { useState } from "react";
import TourModal from "../UI/Modal/TourModal/TourModal";

function ToursAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [tourId, setTourId] = useState(null);

  const [, , tourData, error, isError, , isLoading, , , , , , , , ,] =
    useTourFilter();

  const { data: tourFeatureData, isLoading: isFeatureToursLoading } = useQuery({
    queryKey: ["toursFeature"],
    queryFn: () => getAllTours(true),
  });

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const editBtnClickHandler = (tour) => {
    console.log(tour);

    setTourId(tour._id);
    setShowModal(true);
  };

  // console.log(tourFeatureData);

  return (
    <section className={styles.wrapper}>
      {showModal && !!tourId && (
        <TourModal tourId={tourId} setShowModal={setShowModal} />
      )}
      <div className={styles.head_ctn}>
        <div className={styles.section_head}>
          <h2>Overview - Tours</h2>
        </div>
        <div className={styles.btn_ctn}>
          <Button>New</Button>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : isError ? (
        <div className={styles.tour_load_error}>{error.message}</div>
      ) : (
        <>
          <div className={styles.body_head}>
            <StatBox
              feature={{
                name: "Total Tours",
                icon: <ion-icon name="chatbubble-outline"></ion-icon>,
                color: "#bc0359",
                bgColor: "#f6cde0",
                value: tourData?.results,
              }}
            />
            <div className={styles.feature_review_ctn}>
              <h2 className={styles.text_ctn}>Featured Tours</h2>
              <div className={styles.featured_tours_ctn}>
                {/* <div className={styles.featured_tour}>
                  {!isFeatureToursLoading &&
                    tourFeatureData.data.tours.map((tour) => (
                      <div className={styles.section_body}>
                        <span className={styles.remove_icon_ctn}>
                          <ion-icon name="remove-circle"></ion-icon>
                        </span>
                        <div
                          className={`${styles.body_header} ${stylesGeneral.section_border} `}
                        >
                          <p>{tour.name}</p>
                          <div className={styles.rating_ctn}>
                            <Rating
                              initialValue={tour.ratingsAverage}
                              allowFraction={true}
                              readonly={true}
                              size={16}
                            ></Rating>
                          </div>
                        </div>

                        <div className={styles.body_footer}>
                          <aside>
                            <span
                              className={`${styles.price_tag_secondary} ${stylesGeneral.body__text}`}
                            >
                              from
                            </span>
                            <div className={styles.price_value}>
                              <span className={styles.price_value_sign}>
                                &#x20B9;
                              </span>
                              <span className={styles.price_value_number}>
                                {" "}
                                {tour.price}
                              </span>
                            </div>
                          </aside>
                        </div>
                      </div>
                    ))}
                </div> */}
                <FeaturedTours
                  isFeatureToursLoading={isFeatureToursLoading}
                  tourFeatureData={tourFeatureData}
                />
              </div>
            </div>
          </div>
          <div className={styles.tours_body}>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={styles.ul_ctn}
              style={{ listStyle: "none" }}
            >
              <AnimatePresence>
                {tourData?.data.tours.map((tour) => (
                  <motion.li key={tour._id} variants={itemVariants}>
                    <TourCard
                      tour={tour}
                      destinations={tour.locations.length}
                      startLocation={tour.startLocation.address}
                      adminCard={true}
                      onClick={editBtnClickHandler}
                    ></TourCard>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </>
      )}
    </section>
  );
}

export default ToursAdmin;
