import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../components/users/UserProvider";
import { findBookings } from "../features/apiFearures/bookingApi";

function useMyBookingData() {
  const {
    userState,
    isLoading: isUserLoading,
    error: userLoadError,
  } = useContext(UserContext);

  // console.log(userState);

  const {
    data: bookingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBooking"],
    queryFn: () => {
      const id = userState.user[0]?._id;

      return findBookings(id);
    },
  });

  return [
    bookingData,
    isLoading,
    error,
    isUserLoading,
    userLoadError,
    userState,
  ];
}

export default useMyBookingData;
