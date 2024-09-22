import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { createBooking, createOrder } from "../features/apiFearures/bookingApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/users/UserProvider";
import useBookingData from "../components/helpers/Booking/useBookingData";

const useCreateBooking = (tour) => {
  const dateInputRef = useRef(tour.startDates[0]);

  const [finalBookingData, seFinalBookingData] = useState({});
  const [paymentError, setPaymentError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState("");
  const [bookingError, setBookingError] = useState(false);

  const navigate = useNavigate();

  const [
    booking,
    decreaseAdultHandler,
    addAdultHandler,
    decreaseChildHandler,
    addChildHandler,
  ] = useBookingData(tour);

  const { userState } = useContext(UserContext);

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking Successfull");
      setPaymentSuccess(true);
    },
    onError: (error) => {
      setBookingError(true);
    },
  });

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      setPaymentError(false);

      bookingMutation.mutate({
        ...finalBookingData,
        paymentSignature: res.data.data.paymentSignature,
        orderId: res.data.data.orderId,
        userName: userState.user[0]?.name,
        email: userState.user[0]?.email,
      });
    },
    onError: (error) => {
      setTimeout(() => {
        setPaymentError(true);
      }, 1000);

      if (error === "payment-cancel") {
        setPaymentErrorMessage("Payment Cancelled by the user");
      }

      if (error.description) {
        let md = (
          <span>
            <p>{error.description}</p>
            <br />
            <span>
              <span style={{ fontWeight: "bold" }}>Note:</span>{" "}
              <p style={{ fontSize: "1.4rem" }}>
                Any amount deducted will be refunded back in 3-4 business days
              </p>
            </span>
          </span>
        );

        setPaymentErrorMessage(md);
      }

      if (error.message) {
        setPaymentErrorMessage(
          "An unexpected error occured, please try again later 102"
        );
      }
    },
  });

  const bookingClickHandler = () => {
    if (!userState.authenticated) {
      toast("Please login to continue", {
        style: {
          marginTop: "4.2rem",
          padding: "2.4rem 4.8rem",
        },
      });

      navigate("/app/login");

      return;
    }

    if (!userState.user) {
      toast.error("An unexpected error occured, please try again later 101");
      return;
    }

    const currency = "INR";
    const amount =
      booking.adult * tour.price +
      booking.children * Math.floor(tour.price * 0.6);

    const receipt = `booking_id_${Math.floor(Math.random() * 2000000)}`;

    const userBookingData = {
      bookingData: booking,
      tour: tour._id,
      user: userState.user[0]?._id,
      price: amount,
      tourDate: dateInputRef.current,
    };

    seFinalBookingData(userBookingData);

    orderMutation.mutate({
      receipt,
      amount,
      currency,
      username: userState.user[0]?.name,
      useremail: userState.user[0]?.email,
    });
  };

  function errorModalCloseHandler() {
    setPaymentError(false);
    setPaymentErrorMessage("");
    window.location.href = `/app/tours/${tour._id}/${tour.slug}`;
  }

  function successModalCloseHandler() {
    setPaymentSuccess(false);
    seFinalBookingData({});
    window.location.href = "/app/mybookings";
  }

  function bookingErrorModalCloseHandler() {
    setBookingError(false);
    seFinalBookingData({});
    window.location.href = "/app/mybookings";
  }

  return [
    dateInputRef,
    paymentError,
    paymentSuccess,
    paymentErrorMessage,
    errorModalCloseHandler,
    successModalCloseHandler,
    booking,
    bookingClickHandler,
    decreaseAdultHandler,
    addAdultHandler,
    decreaseChildHandler,
    addChildHandler,
    orderMutation,
    bookingError,
    bookingErrorModalCloseHandler,
    bookingMutation,
  ];
};

export default useCreateBooking;
