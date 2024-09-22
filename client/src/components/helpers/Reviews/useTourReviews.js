import { useQuery } from "@tanstack/react-query";
import { getTourReviews } from "../../../features/apiFearures/reviewsApiFeatures";

function useTourReviews(tourName, tourId) {
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tourReviews", `reviews ${tourName}`],
    queryFn: () => {
      return getTourReviews(tourId);
    },
  });

  return [reviewsData, isLoading, error];
}

export default useTourReviews;
