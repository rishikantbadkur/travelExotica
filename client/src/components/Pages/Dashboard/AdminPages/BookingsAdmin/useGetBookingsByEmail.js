import { useQuery } from "@tanstack/react-query";
import { getBookingByUserMail } from "../../../../../features/adminApi/bookingFeatures";

function useGetBookingsByEmail(userEmail, enableEmailSearch) {
  const {
    data: userEmailBookingData,
    isLoading: isUserEmailBookingDataLoading,
    error: userEmailBookingLoadError,
    refetch,
  } = useQuery({
    queryKey: ["bookings", "email"],
    queryFn: () => {
      return getBookingByUserMail(userEmail);
    },
    enabled: enableEmailSearch,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return [
    userEmailBookingData,
    isUserEmailBookingDataLoading,
    userEmailBookingLoadError,
    refetch,
  ];
}

export default useGetBookingsByEmail;
