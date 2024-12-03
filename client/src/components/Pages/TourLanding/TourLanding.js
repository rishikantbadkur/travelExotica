import { useQuery } from "@tanstack/react-query";
import { getTour } from "../../../features/apiFearures/toursApiFeatures";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import { GENERAL_BODY } from "./staticData";
import styles from "./TourLanding.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Checklist from "../../UI/Checklist/Checklist";
import TourMap from "../../../features/Map/TourMap";
import Dropdown from "../../UI/Dropdown/Dropdown";
import Booking from "../../helpers/Booking/Booking";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useWindowScroll from "../../../hooks/useWindowScroll";
import Spinner from "../../UI/Spinner/Spinner";
import useTitle from "../../../hooks/useTitle";
import ErrorPage from "../../UI/Error/ErrorPage";
import TourGallery from "./TourGallery";
import Reviews from "../../helpers/Reviews/Reviews";

const TourLanding = () => {
  useWindowScroll();

  const params = useParams();
  const tourId = params.id;

  const {
    data: queryResponse,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTour(tourId),
    enabled: !!tourId,
  });

  useTitle(queryResponse?.data?.tour.name);

  const tour = queryResponse?.data?.tour;

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <>
      <Header></Header>
      {!isLoading && queryResponse?.data && (
        <section className={styles.tourLanding}>
          <section className={styles.tourLanding__hero}>
            <div className={styles.tourLanding__hero__imagesContainer}>
              {tour?.images.map((path) => (
                <div className={styles.tourLanding__hero__imageBox} key={path}>
                  <img
                    className={styles.tourLanding__hero__image}
                    src={`${
                      process.env.REACT_APP_SERVER_ROOT_PATH
                    }/images/tours/${(tour?.name).split(" ").join("")}/${path}`}
                    alt={tour.name}
                    crossOrigin="anonymous"
                  ></img>
                </div>
              ))}
            </div>

            <div className={styles.tourLanding__hero__content}>
              <div className={styles.tourLanding__hero__text}>
                <div className={styles.tourLanding__hero_text__venue}>
                  <h2 className={stylesGeneral.heading_tertiary}>
                    {tour?.name}
                  </h2>
                </div>
                <div className={styles.tourLanding__hero_text__description}>
                  <div
                    className={
                      styles.tourLanding__hero_text__description__duration
                    }
                  >
                    <div
                      className={
                        styles.tourLanding__hero_text__description__icon
                      }
                    >
                      <ion-icon
                        className={styles.tourLanding__hero_icon}
                        name="time"
                      ></ion-icon>
                    </div>
                    <div
                      className={
                        styles.tourLanding__hero_text__description__text
                      }
                    >
                      <p
                        className={
                          styles.tourLanding__hero_text__description__text_main
                        }
                      >
                        <span>Duration</span>
                      </p>
                      <p
                        className={
                          styles.tourLanding__hero_text__description__text_sub
                        }
                      >
                        <span>{tour?.duration}</span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      styles.tourLanding__hero_text__description__difficulty
                    }
                  >
                    <div
                      className={
                        styles.tourLanding__hero_text__description__icon
                      }
                    >
                      <ion-icon
                        className={styles.tourLanding__hero_icon}
                        name="barbell"
                      ></ion-icon>
                    </div>
                    <div
                      className={
                        styles.tourLanding__hero_text__description__text
                      }
                    >
                      <p
                        className={
                          styles.tourLanding__hero_text__description__text_main
                        }
                      >
                        <span>Difficulty</span>
                      </p>
                      <p
                        className={
                          styles.tourLanding__hero_text__description__text_sub
                        }
                      >
                        <span>{tour?.difficulty}</span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      styles.tourLanding__hero_text__description__groupSize
                    }
                  >
                    <div
                      className={
                        styles.tourLanding__hero_text__description__icon
                      }
                    >
                      <ion-icon
                        className={styles.tourLanding__hero_icon}
                        name="person"
                      ></ion-icon>
                    </div>
                    <div
                      className={
                        styles.tourLanding__hero_text__description__text
                      }
                    >
                      <p
                        className={
                          styles.tourLanding__hero_text__description__text_main
                        }
                      >
                        <span>Group Size</span>
                      </p>
                      <p
                        className={
                          styles.tourLanding__hero_text__description__text_sub
                        }
                      >
                        <span>{tour?.maxGroupSize}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
              <div className={styles.rating_ctn}>
                <div className={styles.star_ctn}>
                  <Rating
                    initialValue={tour.ratingsAverage}
                    readonly={true}
                    allowFraction={true}
                    size={20}
                  ></Rating>
                  <p
                    className={`${styles.rating__text} ${styles.margin_class_rating}`}
                  >{`( ${tour.ratingsAverage} / 5 )`}</p>
                </div>
                <p
                  className={`${styles.rating__text} ${styles.text_starrating}`}
                >
                  Rated by {tour.ratingsQuantity} travellers
                </p>{" "}
              </div>
            </div>
          </section>

          <section className={styles.tourLanding__body}>
            <div
              className={`${styles.tourLanding__body_intro} ${stylesGeneral.section_border}`}
            >
              <div className={styles.tourLanding__body_text_main}>
                <h3 className={stylesGeneral.heading_quaternary}>
                  Enjoy the Adventure
                </h3>
              </div>
              <div className={styles.tourLanding__body_text_sub}>
                <p className={stylesGeneral.body__text}>{tour.description}</p>
                <br />
                <br />
                {GENERAL_BODY}
              </div>
            </div>
            <div
              className={`${styles.tourLanding__body_features} ${stylesGeneral.section_border}`}
            >
              <div className={styles.tourLanding__body_text_main}>
                <h3 className={stylesGeneral.heading_quaternary}>
                  Included / Excluded
                </h3>
              </div>
              <div className={styles.tourLanding__body_text_sub}>
                <p className={stylesGeneral.body__text}>
                  To help you plan your trip, we have put together a list of
                  what's included and what's not included in your tour package.
                  This will give you a clear understanding of what to expect and
                  help you make any necessary arrangements before your journey
                  begins.
                </p>
              </div>
              <div className={styles.tourLanding__body_features__checklist}>
                <ul className={styles.featureList}>
                  <Checklist></Checklist>
                </ul>
              </div>
            </div>
            <div
              className={`${styles.tourLanding__body__map} ${stylesGeneral.section_border}`}
            >
              <div className={styles.tourLanding__body_text_main}>
                <h3 className={stylesGeneral.heading_quaternary}>Tour Map</h3>
              </div>
              <div
                className={`${styles.tourLanding__body_text_sub} ${styles.map_heading_container}`}
              >
                <p
                  className={`${stylesGeneral.body__text} ${styles.map__padding}`}
                >
                  This comprehensive map is designed to guide you through an
                  exciting journey filled with remarkable destinations and
                  captivating experiences.
                </p>
              </div>
              <TourMap tourMap={tour?.locations} />
            </div>
            <Dropdown itinerary={tour?.itinerary} />
            <TourGallery name={tour?.name}></TourGallery>
          </section>

          <section className={styles.booking}>
            <h6
              className={`${stylesGeneral.heading_decorative} ${styles.form_heading}`}
            >
              One Tour, Infinite memories, make it yours now...
            </h6>
            <Booking tour={tour}></Booking>
          </section>
          <Reviews tourName={tour?.name} tourId={tourId}></Reviews>
        </section>
      )}

      <Footer />
    </>
  );
};

export default TourLanding;
