import React from "react";
import styles from "./Statistics.module.css";

import StatBox from "../UI/StatBox/StatBox";
import useBookingStatData from "../BookingsAdmin/useBookingStatData";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import UpcomingTours from "./UpcomingTours/UpcomingTours";

function Statistics() {
  const [
    ,
    ,
    ,
    ,
    bookingsStatData,
    isBookingsStatDataLoading,
    bookingsStatLoadError,
  ] = useBookingStatData();

  return (
    <>
      {isBookingsStatDataLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : bookingsStatLoadError ? (
        <div className={styles.error}>
          <p>Failed to load bookings statistics data.</p>
        </div>
      ) : (
        <section className={styles.ctn}>
          <div className={styles.stat_ctn}>
            <StatBox
              feature={{
                name: "Total Bookings",
                icon: <ion-icon name="reader-outline"></ion-icon>,
                color: "#458e53",
                bgColor: "#c7f7d1",
                value: bookingsStatData?.totalBookings,
              }}
            />
            <StatBox
              currency={true}
              feature={{
                name: "Sales",
                icon: <ion-icon name="wallet-outline"></ion-icon>,
                color: "#6c48c5",
                bgColor: "#f0edf9",
                value: new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(
                  bookingsStatData.bookingsGraphData.reduce(
                    (acc, crr) => (acc += crr.totalRevenue),
                    0
                  )
                ),
              }}
            />
            <StatBox
              feature={{
                name: "Total Travellers",
                icon: <ion-icon name="people-outline"></ion-icon>,
                color: "#beb262",
                bgColor: "#f8f2ca",
                value:
                  bookingsStatData?.totalAdults +
                  bookingsStatData?.totalChildrens,
              }}
            />
            <StatBox
              feature={{
                name: "Cancelled Bookings",
                icon: <ion-icon name="document-lock-outline"></ion-icon>,
                color: "#cd5c08",
                bgColor: "#f5dece",
                value: bookingsStatData?.cancelledBookings,
              }}
            />
          </div>
          <UpcomingTours />
        </section>
      )}
    </>
  );
}

export default Statistics;
