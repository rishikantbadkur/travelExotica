import styles from "./Tours.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import { getAllTours } from "../../../features/apiFearures/toursApiFeatures";
import { useQuery } from "@tanstack/react-query";
import TourCard from "../../UI/TourCard/TourCard";
import { Link } from "react-router-dom";

const Tours = () => {
  const { data: tourData } = useQuery({
    queryKey: ["toursFeature"],
    queryFn: () => getAllTours(true),
  });

  const tours = tourData?.data?.tours;

  console.log(tours);

  return (
    <>
      {tourData?.data?.tours ? (
        <section className={styles.section__tours}>
          <div className={styles.section__tours_intro_container}>
            <div className={styles.section__tours_intro}>
              <div
                className={styles.section__tours_intro__subheading_container}
              >
                <h6 className={stylesGeneral.heading_decorative}>
                  Dream Vacation Destination
                </h6>
              </div>
              <div className={styles.section__tours_intro__heading_container}>
                <h1 className={stylesGeneral.heading_secondary}>
                  Plan the Trip of a Lifetime with Ease
                </h1>
              </div>
              <div className={styles.section__tours_intro__text_container}>
                <p className={stylesGeneral.body__text}>
                  Whether you're looking for a romantic getaway, a
                  family-friendly adventure, or a solo journey to explore the
                  world, we can provide you with a custom-tailored itinerary
                  that exceeds your expectations.
                </p>
              </div>
            </div>

            <div className={styles.section__tours_intro__image}></div>
          </div>

          <div className={styles.section__tours_imagesBox}>
            <div
              className={`${styles.section__tours_imageBox_self} ${styles.tours_imgBox1}`}
            >
              <p>Island Views</p>
            </div>
            <div
              className={`${styles.section__tours_imageBox_self} ${styles.tours_imgBox2}`}
            >
              <p>City Walks Tours</p>
            </div>
            <div
              className={`${styles.section__tours_imageBox_self} ${styles.tours_imgBox3}`}
            >
              <p>Mountain Treks</p>
            </div>
          </div>
          <div className={styles.tours_container}>
            {tours.map((tour) => (
              <TourCard
                key={tour.name}
                tour={tour}
                destinations={tour.locations.length}
                startLocation={tour.startLocation.address}
              ></TourCard>
            ))}
          </div>
          <div
            className={stylesGeneral.heading_decorative}
            style={{ textAlign: "center", marginTop: "2.4rem" }}
          >
            <span className={stylesGeneral.heading_decorative}>
              <Link
                to="/app/tours"
                style={{ textDecoration: "none", color: "#1bbc9b" }}
              >
                Check All Tours
              </Link>
            </span>
          </div>
        </section>
      ) : (
        <section className={styles.section__tours}>
          <div className={styles.section__tours_intro_container}>
            <div className={styles.section__tours_intro}>
              <div
                className={styles.section__tours_intro__subheading_container}
              >
                <h6 className={stylesGeneral.heading_decorative}>
                  Dream Vacation Destination
                </h6>
              </div>
              <div className={styles.section__tours_intro__heading_container}>
                <h1 className={stylesGeneral.heading_secondary}>
                  Plan the Trip of a Lifetime with Ease
                </h1>
              </div>
              <div className={styles.section__tours_intro__text_container}>
                <p className={stylesGeneral.body__text}>
                  Whether you're looking for a romantic getaway, a
                  family-friendly adventure, or a solo journey to explore the
                  world, we can provide you with a custom-tailored itinerary
                  that exceeds your expectations.
                </p>
              </div>
            </div>

            <div className={styles.section__tours_intro__image}></div>
          </div>

          <div className={styles.section__tours_imagesBox}>
            <div
              className={`${styles.section__tours_imageBox_self} ${styles.tours_imgBox1}`}
            >
              <p>Island Views</p>
            </div>
            <div
              className={`${styles.section__tours_imageBox_self} ${styles.tours_imgBox2}`}
            >
              <p>City Walks Tours</p>
            </div>
            <div
              className={`${styles.section__tours_imageBox_self} ${styles.tours_imgBox3}`}
            >
              <p>Mountain Treks</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Tours;
