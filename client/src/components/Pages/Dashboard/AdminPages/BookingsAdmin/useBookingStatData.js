import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBookingStats } from "../../../../../features/adminApi/bookingFeatures";

function useBookingStatData() {
  const [yearData, setYearData] = useState("all");
  const [monthData, setMonthData] = useState("all");

  const {
    data: bookingsStatData,
    isLoading: isBookingsStatDataLoading,
    error: bookingsStatLoadError,
  } = useQuery({
    queryKey: ["bookingStats", `year-${yearData},month-${monthData}`],
    queryFn: () => {
      return getBookingStats(yearData, monthData);
    },
  });
  return [
    yearData,
    monthData,
    setYearData,
    setMonthData,
    bookingsStatData,
    isBookingsStatDataLoading,
    bookingsStatLoadError,
  ];
}

export default useBookingStatData;
