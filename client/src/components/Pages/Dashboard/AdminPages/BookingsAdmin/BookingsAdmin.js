import { useState } from "react";

import styles from "./BookingsAdmin.module.css";
import StatBox from "../UI/StatBox/StatBox";
import BookingGraph from "./BookingGraph";

import BookingLineChartDisplay from "./BookingLineChartDisplay";

import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import useBookingStatData from "./useBookingStatData";
import YearMonthForm from "../UI/YearMonthForm/YearMonthForm";
import useAdminBookingData from "./useAdminBookingData";
import BookingCard from "../../../../UI/BookingCard/BookingCard";

import BookingDisplay from "./BookingDisplay";
import BookingByEmail from "./BookingByEmail";
import useGetBookingsByEmail from "./useGetBookingsByEmail";

function BookingsAdmin() {
  const [singleBookingSearch, setSingleBookingSearch] = useState(false);
  const [singleBookingSearchByEmail, setSingleBookingSearchByEmail] =
    useState(false);
  const [singleUserBooking, setSingleUserBooking] = useState();
  const [singleUserBookingByEmail, setSingleUserBookingByEmail] = useState();
  const [singleUserBookingLoading, setSingleUserBookingLoading] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [enableEmailSearch, setEnableEmailSearch] = useState(false);
  const [showEmailBookingData, setShowEmailBookingData] = useState(false);

  const [
    yearData,
    monthData,
    setYearData,
    setMonthData,
    bookingsStatData,
    isBookingsStatDataLoading,
    bookingsStatLoadError,
  ] = useBookingStatData();

  console.log(bookingsStatData);

  const [
    setPageCount,
    year,
    month,
    setYear,
    setMonth,
    adminBookingData,
    isAdminBookingDataLoading,
    adminBookingDataLoadError,
  ] = useAdminBookingData();

  const [
    userEmailBookingData,
    isUserEmailBookingDataLoading,
    userEmailBookingLoadError,
    refetch,
  ] = useGetBookingsByEmail(userEmail, enableEmailSearch);

  const nextPageHandler = () => {
    if (
      adminBookingData.pagination.currentPage <
      adminBookingData.pagination.totalPages
    ) {
      setPageCount(adminBookingData.pagination.currentPage + 1);
    }
  };

  const previousPageHandler = () => {
    if (adminBookingData.pagination.currentPage > 1) {
      setPageCount(adminBookingData.pagination.currentPage - 1);
    }
  };

  const emailFormSubmitHandler = (e) => {
    e.preventDefault();
    setShowEmailBookingData(true);
    setEnableEmailSearch(true);
    refetch();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter_ctn}>
        <YearMonthForm
          year={yearData}
          month={monthData}
          setMonth={setMonthData}
          setYear={setYearData}
        />
      </div>
      {isBookingsStatDataLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : bookingsStatLoadError ? (
        <div className={styles.error_stat}>
          <p>
            Something went wrong while fetching the data, please try again
            later.
          </p>
        </div>
      ) : (
        <>
          <div className={`${styles.head_ctn} ${styles.margin_class}`}>
            <h2>
              Overview -{" "}
              {bookingsStatData.period === "all time"
                ? "All Time"
                : bookingsStatData.period.month === null
                ? bookingsStatData.period.year
                : new Date(
                    bookingsStatData.period.year,
                    bookingsStatData.period.month
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
            </h2>
          </div>
          <div className={styles.stat_ctn}>
            <div className={styles.statbox_ctn}>
              <StatBox
                feature={{
                  name: "Total Bookings",
                  icon: <ion-icon name="id-card-outline"></ion-icon>,
                  color: "#3c326c",
                  bgColor: "#d9d7e4",
                  value: bookingsStatData.totalBookings,
                }}
              />
              <StatBox
                feature={{
                  name: "Bookings For Period",
                  icon: <ion-icon name="id-card-outline"></ion-icon>,
                  color: "#b22929",
                  bgColor: "#f4d5d5",
                  value: bookingsStatData.bookings.reduce(
                    (acc, crr) => (acc = acc + crr.value),
                    0
                  ),
                }}
              />
              <StatBox
                feature={{
                  name: "Booking % For Period",
                  icon: <ion-icon name="podium-outline"></ion-icon>,
                  color: "#00804e",
                  bgColor: "#b3ffe1",
                  value: `${(
                    (bookingsStatData.bookings.reduce(
                      (acc, crr) => (acc = acc + crr.value),
                      0
                    ) /
                      bookingsStatData.totalBookings) *
                    100
                  ).toFixed(0)} %`,
                }}
              />
              <StatBox
                feature={{
                  name: "Adults",
                  icon: <ion-icon name="person-outline"></ion-icon>,
                  color: "#977b19",
                  bgColor: "#fef0bf",
                  value: bookingsStatData.totalAdults,
                }}
              />
              <StatBox
                feature={{
                  name: "Childrens",
                  icon: <ion-icon name="accessibility-outline"></ion-icon>,
                  color: "#069bcc",
                  bgColor: "#cef3ff",
                  value: bookingsStatData.totalChildrens,
                }}
              />
            </div>
            <div className={`${styles.piechart_ctn} ${styles.margin_class}`}>
              <BookingGraph data={bookingsStatData.bookings} />
            </div>
          </div>

          <div
            className={`${styles.head_ctn} `}
            style={{ fontSize: "1.4rem", marginTop: "2rem" }}
          >
            <h2>
              Bookings & Revenue graph -{" "}
              {bookingsStatData.period === "all time"
                ? "All Time"
                : bookingsStatData.period.month === null
                ? bookingsStatData.period.year
                : new Date(
                    bookingsStatData.period.year,
                    bookingsStatData.period.month
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
            </h2>
          </div>
          <div className={styles.stat_revenue_ctn}>
            <StatBox
              currency={true}
              feature={{
                name: "Revenue For Period",
                icon: <ion-icon name="wallet-outline"></ion-icon>,
                color: "#069bcc",
                bgColor: "#cef3ff",
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
          </div>
          <div className={styles.lineGraph_ctn}>
            <BookingLineChartDisplay data={bookingsStatData} />
          </div>
        </>
      )}
      <div className={styles.bookingData_ctn}>
        <div className={styles.booking_ctn}>
          <div className={`${styles.head_ctn} ${styles.margin_class}`}>
            <h2>Manage Bookings</h2>
          </div>
          <YearMonthForm
            year={year}
            month={month}
            setMonth={setMonth}
            setYear={setYear}
            setPageCount={setPageCount}
          />
          {isAdminBookingDataLoading ? (
            <div className={styles.loading}>
              <SpinnerMedium />
            </div>
          ) : adminBookingDataLoadError ? (
            <div className={styles.error_stat}>
              <p>
                Something went wrong while fetching the data, please try again
                later.
              </p>
            </div>
          ) : adminBookingData.data.length === 0 ? (
            <div
              className={`${styles.booking_list_ctn} ${styles.booking_noData}`}
            >
              <p>No Data to display for the selected period</p>
            </div>
          ) : (
            <>
              <div className={styles.paginate_ctn}>
                <span style={{ letterSpacing: "0.5px" }}>
                  <p>
                    Showing{" "}
                    {(adminBookingData.pagination.currentPage - 1) *
                      adminBookingData.pagination.resultsPerPage +
                      1}{" "}
                    -{" "}
                    {adminBookingData.pagination.currentPage ===
                    adminBookingData.pagination.totalPages
                      ? adminBookingData.pagination.resultsPerPage *
                          (adminBookingData.pagination.currentPage - 1) +
                        adminBookingData.results
                      : adminBookingData.pagination.resultsPerPage *
                        adminBookingData.pagination.currentPage}{" "}
                    of {adminBookingData.pagination.totalBookings} results
                  </p>
                </span>
                <span style={{ letterSpacing: "0.5px" }}>
                  <p>
                    Page {adminBookingData.pagination.currentPage} of{" "}
                    {adminBookingData.pagination.totalPages}
                  </p>
                </span>
              </div>
              <div className={styles.booking_list_ctn}>
                {adminBookingData.data.map((booking) => (
                  <div
                    className={styles.booking_card_ctn}
                    key={booking._id}
                    onClick={() => {
                      setSingleBookingSearch(true);
                      setSingleUserBookingLoading(true);
                      setTimeout(() => {
                        setSingleUserBookingLoading(false);
                        setSingleUserBooking(booking);
                      }, 200);
                    }}
                  >
                    <BookingCard booking={booking} adminCard={true} />
                  </div>
                ))}
              </div>
              {!isAdminBookingDataLoading && (
                <div className={styles.btn_ctn}>
                  <button className={styles.btn} onClick={previousPageHandler}>
                    Prev
                  </button>

                  <button className={styles.btn} onClick={nextPageHandler}>
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.booking_user_ctn}>
          {singleBookingSearch && singleUserBookingLoading && (
            <div className={` ${styles.loading_sub} `}>
              <SpinnerMedium />
            </div>
          )}
          {singleBookingSearch && !singleUserBookingLoading && (
            <div className={styles.booking_view_ctn}>
              <BookingDisplay
                booking={singleUserBooking}
                setSingleBookingSearch={setSingleBookingSearch}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.booking_by_user_ctn}>
        <div
          className={styles.head_ctn}
          style={{ fontSize: "1.4rem", marginTop: "7rem" }}
        >
          <h2>Search Bookings By User</h2>
        </div>
        <form className={styles.search_ctn}>
          <input
            type="email"
            placeholder="Search by email"
            value={userEmail}
            className={styles.search_input}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <button
            className={styles.search_btn_ctn}
            onClick={emailFormSubmitHandler}
          >
            <ion-icon name="search"></ion-icon>
          </button>
        </form>
        {showEmailBookingData && (
          <div className={styles.email_booking_ctn}>
            <BookingByEmail
              userEmailBookingData={userEmailBookingData}
              isUserEmailBookingDataLoading={isUserEmailBookingDataLoading}
              userEmailBookingLoadError={userEmailBookingLoadError}
              setSingleUserBookingByEmail={setSingleUserBookingByEmail}
              setSingleBookingSearchByEmail={setSingleBookingSearchByEmail}
            />
            {singleBookingSearchByEmail && (
              <div className={styles.booking_view_ctn_2}>
                <BookingDisplay
                  booking={singleUserBookingByEmail}
                  setSingleBookingSearch={setSingleBookingSearchByEmail}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingsAdmin;
