import axios from "./axiosInstance";

export async function getTourReviews(tourId) {
  try {
    const response = await axios.get(`/api/v1/reviews/tour/${tourId}`);

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function createReview({ tourId, data }) {
  const token = localStorage.getItem("travelExoticaJwt");

  try {
    const response = await axios.post(`/api/v1/reviews/tour/${tourId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function editReviewFn({ tourId, data }) {
  const token = localStorage.getItem("travelExoticaJwt");

  try {
    const response = await axios.patch(`/api/v1/reviews/tour/${tourId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getFeatureReviews() {
  try {
    const response = await axios.get("/api/v1/reviews/feature");

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
