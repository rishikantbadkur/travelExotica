import { useState } from "react";
import styles from "./UpcomingTours.module.css";
import stylesGeneral from "../../../../../../styles/general.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingTours } from "../../../../../../features/adminApi/tourFeatures";
import TourDetail from "./TourDetail";

function UpcomingTours() {
  const [tourDetail, showTourDetail] = useState(false);
  const [tourId, setTourId] = useState();
  const [tourDate, setTourDate] = useState();
  const [tourName, setTourName] = useState();
  const [groupSize, setGroupSize] = useState();
  const [tourPrice, setTourPrice] = useState();

  const { data, isLoading, error } = useQuery({
    queryKey: ["upcomingtours"],
    queryFn: getUpcomingTours,
  });

  const tourClickHandler = (
    tourId,
    tourDate,
    tourName,
    groupSize,
    tourPrice
  ) => {
    setTourId(tourId);
    setTourDate(tourDate);
    setTourName(tourName);
    setGroupSize(groupSize);
    setTourPrice(tourPrice);
    showTourDetail(true);
  };

  return (
    <div className={styles.ctn}>
      <h2 className={styles.heading}>Upcoming Tours</h2>
      {!isLoading && (
        <div className={styles.tours_ctn}>
          <div className={styles.upcomingtours_ctn}>
            {data.tours.map((tour, index) => (
              <div
                key={index}
                className={styles.tour_ctn}
                onClick={() =>
                  tourClickHandler(
                    tour.id,
                    tour.date,
                    tour.name,
                    tour.maxGroupSize,
                    tour.price
                  )
                }
                style={
                  new Date(tour.date) <= new Date(Date.now())
                    ? { backgroundColor: "#bbebe1" }
                    : new Date(tour.date).getDate() ===
                        new Date(Date.now()).getDate() + 1 &&
                      new Date(tour.date).getMonth() ===
                        new Date(Date.now()).getMonth()
                    ? { backgroundColor: "#bbebe1" }
                    : {}
                }
              >
                {new Date(tour.date).getDate() ===
                  new Date(Date.now()).getDate() + 1 &&
                  new Date(tour.date).getMonth() ===
                    new Date(Date.now()).getMonth() && (
                    <div className={styles.tag_ctn}>
                      <p>Leaving tomorrow</p>
                    </div>
                  )}
                <span className={styles.section_1}>
                  <p
                    className={`${stylesGeneral.body__text} ${styles.custom_text_style}`}
                  >
                    {tour.name}
                  </p>
                  <p className={stylesGeneral.body__text}>
                    <span style={{ color: "#000", fontWeight: "bold" }}>
                      Date :{" "}
                    </span>
                    {new Date(tour.date)
                      .toLocaleDateString()
                      .split("/")
                      .join("-")}
                  </p>
                </span>
                <span className={styles.section_2}>
                  <p className={stylesGeneral.body__text}></p>
                </span>
              </div>
            ))}
          </div>
          {tourDetail && (
            <TourDetail
              tourId={tourId}
              tourDate={tourDate}
              tourName={tourName}
              groupSize={groupSize}
              tourPrice={tourPrice}
              showTourDetail={showTourDetail}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default UpcomingTours;
