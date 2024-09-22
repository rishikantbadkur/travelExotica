import { useContext, useEffect, useState } from "react";
import useTourReviews from "./useTourReviews";
import useMyBookingData from "../../../hooks/useMyBookingData";
import { UserContext } from "../../users/UserProvider";

function checkDaysPassed(createdAt) {
  const currentDate = new Date(Date.now()).getTime();
  const diffInMs = currentDate - new Date(createdAt).getTime();
  const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return daysPassed;
}

function usePostReviewCriteria(tourName, tourId) {
  const [userReview, setUserReview] = useState(null);
  const [isUserEligibleToReview, setIsUserEligibleToReview] = useState(false);

  const [reviewsData, isLoading] = useTourReviews(tourName, tourId);

  const { userState } = useContext(UserContext);

  const [bookingData] = useMyBookingData();

  useEffect(() => {
    if (bookingData?.results > 0) {
      const booking = bookingData?.data.find((booking) => {
        return (
          booking.tour._id === tourId &&
          booking.user._id === userState?.user[0]._id
        );
      });

      if (!booking) {
        return;
      }

      const daysPassed = checkDaysPassed(booking.createdAt);

      if (!(daysPassed >= booking.tour.duration)) {
        return;
      }

      const review = reviewsData?.data.find(
        (review) => review.user._id === userState?.user[0]._id
      );

      if (!review) {
        setIsUserEligibleToReview(true);
        return;
      }

      setUserReview(review);
    }
  }, [bookingData, tourId, reviewsData, userState]);

  return [
    reviewsData,
    userState,
    isLoading,
    userReview,
    isUserEligibleToReview,
  ];
}

export default usePostReviewCriteria;
