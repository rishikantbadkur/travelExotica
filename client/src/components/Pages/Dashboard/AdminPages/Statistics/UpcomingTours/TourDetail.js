import React from "react";
import styles from "./TourDetail.module.css";
import stylesGeneral from "../../../../../../styles/general.module.css";
import Button from "../../../../../UI/Button/Button";
import useGetBookingsByTour from "../../../../../../hooks/useGetBookingsByTour";
import SpinnerMedium from "../../../../../UI/SpinnerMedium/SpinnerMedium";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTourDates } from "../../../../../../features/adminApi/tourFeatures";
import toast from "react-hot-toast";

function TourDetail({
  tourId,
  tourDate,
  tourName,
  groupSize,
  tourPrice,
  showTourDetail,
}) {
  const { bookingsData, isLoading, error } = useGetBookingsByTour(
    tourId,
    tourDate
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTourDates,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Success");
        queryClient.invalidateQueries(["tour", tourId]);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const tourConfirmHandler = () => {
    const flag = window.confirm(
      "Are you sure you wish to proceed. New user will no longer be able to book the tour for this particular date."
    );

    if (!flag) {
      return;
    }

    mutation.mutate({ tourId, tourDate });
    showTourDetail(false);
  };

  const tourCancelHandler = () => {
    const flag = window.confirm("Are you sure you wish to cancel this tour?");

    if (!flag) return;

    mutation.mutate({ tourId, tourDate });
    showTourDetail(false);
  };

  return (
    <div className={styles.tourdetails_ctn}>
      {isLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>Something went wrong while fetching the information.</p>
        </div>
      ) : (
        <div className={styles.border}>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Tour : </span>
            {tourName}
          </p>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Date : </span>
            {new Date(tourDate).toLocaleDateString().split("/").join("-")}
          </p>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Price : </span>
            <span>&#x20B9;</span>&nbsp;
            {new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 0,
            }).format(tourPrice)}
          </p>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Group Size : </span>
            {groupSize}
          </p>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Booked Seats : </span>
            {bookingsData.bookings.length}
          </p>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Occupancy Rate : </span>
            {Math.round((bookingsData.bookings.length / groupSize) * 100, 0)} %
          </p>
          <p className={stylesGeneral.body__text}>
            <span className={styles.color_black}>Estimated Revenue : </span>
            <span>&#x20B9;</span>&nbsp;
            {bookingsData.bookings.length > 0
              ? new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(
                  bookingsData.bookings.reduce((acc, crr) => {
                    return acc + crr.price;
                  }, 0)
                )
              : 0}
          </p>
          <div className={stylesGeneral.body__text}>
            <span className={`${styles.color_black} ${styles.margin_class}`}>
              Travellers :{" "}
            </span>
            {bookingsData.bookings.length > 0 &&
              bookingsData.bookings.map((booking) => (
                <p key={booking._id}>
                  <span className={styles.color_black}>
                    {booking.user.name}
                  </span>
                  {booking.user.email}
                </p>
              ))}
          </div>
          <div className={styles.btn_ctn}>
            <Button onClick={tourConfirmHandler}>Confirm</Button>
            <Button btnSub={true} onClick={tourCancelHandler}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TourDetail;
