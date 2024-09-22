import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createReview } from "../../../features/apiFearures/reviewsApiFeatures";
import { editReviewFn } from "../../../features/apiFearures/reviewsApiFeatures";

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function useCreateEditReview(tourId, userId, reviewId) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(4.5);
  const [updateRating, setUpdateRating] = useState(4.5);
  const [editReview, setEditReview] = useState(false);
  const [editReviewText, setEditReviewText] = useState("");

  function getTourName(name) {
    const data = name.split("-");

    for (let i = 0; i < data.length; i++) {
      data[i] = data[i][0].toUpperCase() + data[i].slice(1);
    }

    return data.join(" ");
  }

  const queryClient = useQueryClient();

  const params = useParams();

  const tourName = getTourName(params.id);

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: (res) => {
      toast.success("Review created successfully");
      setReviewText("");
      setRating(4.5);
      queryClient.invalidateQueries(["tourReviews", `reviews ${tourName}`]);
    },
  });

  const editReviewMutation = useMutation({
    mutationFn: editReviewFn,
    onSuccess: (res) => {
      toast.success("Review edited successfully");
      console.log(res);
      setUpdateRating(4.5);
      setEditReview(false);
      setEditReviewText("");

      queryClient.invalidateQueries(["tourReviews", `reviews ${tourName}`]);
    },
  });

  function ratingChangeHandler(e) {
    setRating(e);
  }

  function reviewTextChangeHandler(e) {
    setReviewText(e.target.value);
  }

  function newReviewCreateHandler() {
    if (reviewText.trim().length <= 7) {
      toast.error("Review length should be greater than 8 characters");
      return;
    }

    createReviewMutation.mutate({
      tourId: tourId,
      data: {
        tour: tourId,
        user: userId,
        rating: rating,
        description: reviewText,
      },
    });
  }

  function updateRatingChangeHandler(e) {
    setUpdateRating(e);
  }

  function editReviewTextChangeHandler(e) {
    setEditReviewText(e.target.value);
  }

  function editReviewSubmitHandler() {
    if (editReviewText.trim().length <= 7) {
      toast.error("Review length should be greater than 8 characters");
      return;
    }

    editReviewMutation.mutate({
      tourId: reviewId,
      data: {
        rating: updateRating,
        description: editReviewText,
      },
    });
  }

  return [
    reviewText,
    ratingChangeHandler,
    reviewTextChangeHandler,
    newReviewCreateHandler,
    editReview,
    setEditReview,
    createReviewMutation,
    editReviewText,
    editReviewTextChangeHandler,
    editReviewMutation,
    updateRatingChangeHandler,
    editReviewSubmitHandler,
  ];
}

export default useCreateEditReview;
