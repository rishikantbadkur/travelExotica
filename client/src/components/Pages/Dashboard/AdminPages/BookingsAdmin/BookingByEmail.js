import styles from "./BookingByEmail.module.css";
import BookingCard from "../../../../UI/BookingCard/BookingCard";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";
import toast from "react-hot-toast";

function BookingByEmail({
  userEmailBookingData,
  isUserEmailBookingDataLoading,
  userEmailBookingLoadError,
  setSingleUserBookingByEmail,
  setSingleBookingSearchByEmail,
}) {
  if (userEmailBookingLoadError) {
    return (
      <div className={styles.booking_list_ctn}>
        <div className={styles.error_ctn}>
          <p>Something went wrong while fetching the data</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {isUserEmailBookingDataLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : userEmailBookingData.message === "no user" ? (
        <div className={styles.booking_list_ctn}>
          <div className={styles.error_ctn}>
            <p>No User found.</p>
          </div>
        </div>
      ) : userEmailBookingData.data.length === 0 ? (
        <div className={styles.booking_list_ctn}>
          <div className={styles.error_ctn}>
            <p>No Bookings found for the user.</p>
          </div>
        </div>
      ) : (
        <div className={styles.booking_list_ctn}>
          {userEmailBookingData?.data.map((booking) => (
            <div
              className={styles.booking_card_ctn}
              key={booking._id}
              onClick={() => {
                setSingleUserBookingByEmail(booking);
                setSingleBookingSearchByEmail(true);
              }}
            >
              <BookingCard booking={booking} adminCard={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default BookingByEmail;
