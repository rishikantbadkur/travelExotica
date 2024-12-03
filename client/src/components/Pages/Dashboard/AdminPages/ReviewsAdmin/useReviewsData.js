import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "../../../../../features/adminApi/reviewFeatures";
import { useState } from "react";

function useReviewsData() {
  const [pageCount, setPageCount] = useState(1);

  const {
    data: reviewsData,
    isLoading: isReviewsDataLoading,
    error: reviewsDataLoadError,
  } = useQuery({
    queryKey: ["All Reviews", `page:${pageCount}`],
    queryFn: () => {
      return getAllReviews(pageCount);
    },
  });

  return [
    reviewsData,
    isReviewsDataLoading,
    reviewsDataLoadError,
    pageCount,
    setPageCount,
  ];
}

export default useReviewsData;
