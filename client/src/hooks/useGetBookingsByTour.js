import { useQuery } from "@tanstack/react-query";
import { getBookingsByTour } from "../features/adminApi/bookingFeatures";

function useGetBookingsByTour(tourId, tourDate) {
  const {
    data: bookingsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", tourId, tourDate],
    queryFn: () => {
      return getBookingsByTour(tourId, tourDate);
    },
  });
  return { bookingsData, isLoading, error };
}

export default useGetBookingsByTour;
