import { useQuery } from "@tanstack/react-query";
import { getFeatureReviews } from "../../../features/apiFearures/reviewsApiFeatures";

function useFeatureReviews() {
  const { data: reviewsFeature, isLoading } = useQuery({
    queryKey: ["featureReviews"],
    queryFn: getFeatureReviews,
  });

  return [reviewsFeature, isLoading];
}

export default useFeatureReviews;
