import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllBookings } from "../../../../../features/adminApi/bookingFeatures";

function useAdminBookingData() {
  const [pageCount, setPageCount] = useState(1);
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  const {
    data: adminBookingData,
    isLoading: isAdminBookingDataLoading,
    error: adminBookingDataLoadError,
  } = useQuery({
    queryKey: ["bookingData", `year-${year},month-${month},page-${pageCount}`],
    queryFn: () => {
      return getAllBookings(year, month, pageCount);
    },
    placeholderData: keepPreviousData,
  });

  return [
    setPageCount,
    year,
    month,
    setYear,
    setMonth,
    adminBookingData,
    isAdminBookingDataLoading,
    adminBookingDataLoadError,
  ];
}

export default useAdminBookingData;
