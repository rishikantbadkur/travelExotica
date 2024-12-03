import { useQuery } from "@tanstack/react-query";
import { getReviewStats } from "../../../../../features/adminApi/reviewFeatures";

function useReviewsStatData() {
  const {
    data: reviewsData,
    isLoading: isReviewsStatDataLoading,
    error: reviewsStatDataLoadError,
  } = useQuery({
    queryKey: ["Reviews Stat"],
    queryFn: getReviewStats,
  });
  return [reviewsData, isReviewsStatDataLoading, reviewsStatDataLoadError];
}

export default useReviewsStatData;
