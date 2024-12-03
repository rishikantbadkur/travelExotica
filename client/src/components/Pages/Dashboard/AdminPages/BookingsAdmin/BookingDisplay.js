import styles from "./BookingDisplay.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";
import Button from "../../../../UI/Button/Button";
import SpinnerMini from "../../../../UI/SpinnerMini/SpinnerMini";
import { useContext, useState } from "react";
import useBookingCancel from "./useBookingCancel";
import toast from "react-hot-toast";
import { UserContext } from "../../../../users/UserProvider";

function BookingDisplay({ booking, setSingleBookingSearch }) {
  const [displayCancelInfo, setDisplayCancelInfo] = useState(false);
  const [consentFlag, setConsentFlag] = useState(false);
  const [cancelRemarks, setCancelRemarks] = useState("");

  const [mutation] = useBookingCancel(setSingleBookingSearch);

  const { userState } = useContext(UserContext);

  const bookingCancellationHandler = () => {
    if (cancelRemarks.trim().length < 8) {
      return toast.error(
        "Cancellation remarks should be greater than 8 characters."
      );
    }

    const consent = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!consent) return;

    mutation.mutate({
      bookingId: booking._id,
      remarks: cancelRemarks,
      owner: userState?.user[0]._id,
      date: Date.now(),
    });
  };

  return (
    <div className={styles.booking_display_ctn}>
      <div className={styles.display_card_ctn}>
        {booking.active === true && (
          <span className={`${styles.role_ctn} ${styles.booking_active}`}>
            Active
          </span>
        )}
        {booking.active === false && (
          <span className={`${styles.role_ctn} ${styles.booking_cancelled}`}>
            Cancelled
          </span>
        )}
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Tour : </p>
          <p>{booking.tour.name}</p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Tour Date : </p>
          <p>
            {new Date(booking.tourDate)
              .toLocaleDateString()
              .split("/")
              .join("-")}
          </p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Name : </p>
          <p>{booking.user.name}</p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Email : </p>
          <p>{booking.user.email}</p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Travellers : </p>
          <p>Adult : {booking.bookingData.adult}</p>
          <p style={{ marginLeft: "1.6rem" }}>
            Children : {booking.bookingData.children}
          </p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Amount Paid : </p>
          <span>&#x20B9;</span>&nbsp;
          <p>
            {new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 0,
            }).format(booking.price)}
          </p>
        </div>
        <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
          <p className={styles.text_custom}>Order Id : </p>
          <p>{booking.orderId}</p>
        </div>
        <div
          className={`${styles.data_ctn} ${stylesGeneral.body__text}`}
          style={{ marginTop: "1.6rem" }}
        >
          <p className={styles.text_custom}>Booking Date : </p>
          <p>
            {new Date(booking.createdAt)
              .toLocaleDateString()
              .split("/")
              .join("-")}
          </p>
        </div>
        {!booking.active && (
          <>
            <div
              className={`${styles.cancel_detail_ctn} ${stylesGeneral.body__text}`}
            >
              <p className={styles.text_custom}>Cancellation Details </p>
            </div>
            <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
              <p className={styles.text_custom}>Remarks : </p>
              <p>{booking.cancellationDetails.remarks}</p>
            </div>
            <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
              <p className={styles.text_custom}>Cancelled on : </p>
              <p>
                {new Date(booking.cancellationDetails.date)
                  .toLocaleDateString()
                  .split("/")
                  .join("-")}
              </p>
            </div>
            <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
              <p className={styles.text_custom}>Processor : </p>
              <p>{`${booking.cancellationDetails.owner.name} `}</p>
            </div>
            <div className={`${styles.data_ctn} ${stylesGeneral.body__text}`}>
              <p className={styles.text_custom}>Email : </p>
              <p>{`<${booking.cancellationDetails.owner.email}>`}</p>
            </div>
          </>
        )}
        {booking.active && (
          <div className={styles.display_btn_ctn}>
            <Button
              onClick={() => {
                // setFormToggle((prev) => !prev);
              }}
            >
              Update
            </Button>
            <span className={styles.cancel_button}>
              <Button
                btnSub={true}
                onClick={() => setDisplayCancelInfo((prev) => !prev)}
              >
                Cancel
              </Button>
            </span>
          </div>
        )}
        {displayCancelInfo && (
          <div className={styles.cancel_ctn}>
            <div className={styles.remarks_ctn}>
              <label className={styles.cancel_label}>
                Cancellation Remarks{""}
                <span style={{ color: "red" }}>{""}*</span> :{" "}
              </label>
              <textarea
                type="text"
                required
                minLength={20}
                rows={3}
                onChange={(e) => setCancelRemarks(e.target.value)}
              />
            </div>
            <div className={styles.cancel_agreement_ctn}>
              <input
                type="checkbox"
                onChange={() => setConsentFlag((prev) => !prev)}
              />
              <p className={styles.cancel_text}>
                I confirm that this booking is being cancelled by user's consent
                and travel Exotica has initiated the refund process.
              </p>
            </div>
            <div className={styles.delete_btn_ctn}>
              <Button
                delType={true}
                disabled={!consentFlag}
                onClick={bookingCancellationHandler}
              >
                Confirm
              </Button>
              {mutation.status === "pending" ? (
                <span>
                  <SpinnerMini></SpinnerMini>
                </span>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingDisplay;
