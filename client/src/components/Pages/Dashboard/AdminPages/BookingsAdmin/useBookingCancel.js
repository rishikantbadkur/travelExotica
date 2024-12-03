import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelBooking } from "../../../../../features/adminApi/bookingFeatures";

function useBookingCancel(setSingleBookingSearch) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Booking Cancelled Successfully");
      }
      setSingleBookingSearch(false);
      queryClient.invalidateQueries(["bookingData"]);
    },

    onError: (error) => {
      toast.error(
        "Something went wrong while cancelling the booking, please try again later"
      );
    },
  });

  return [mutation];
}

export default useBookingCancel;
