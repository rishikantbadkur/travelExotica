import Header from "../Header/Header";
import toast from "react-hot-toast";

import NoBooking from "./NoBooking";
import Spinner from "../../UI/Spinner/Spinner";
import Bookings from "./Bookings";
import useMyBookingData from "../../../hooks/useMyBookingData";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [
    bookingData,
    isLoading,
    error,
    isUserLoading,
    userLoadError,
    userState,
  ] = useMyBookingData();

  const navigate = useNavigate();

  if (isUserLoading || isLoading) {
    return <Spinner></Spinner>;
  }

  if (!!error || !!userLoadError) {
    toast.error(
      "Something went wrong while fetching the booking data, please try again later"
    );
  }

  if (userState?.user.length === 0) {
    navigate("/app/login");
    return;
  }

  return (
    <>
      <Header></Header>

      {bookingData && bookingData?.results > 0 && (
        <Bookings bookings={bookingData?.data}></Bookings>
      )}
      {bookingData && bookingData?.results === 0 && <NoBooking></NoBooking>}
    </>
  );
};

export default MyBooking;
