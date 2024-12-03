import axios from "../apiFearures/axiosInstance";

export async function getReviewStats() {
  try {
    const response = await axios.get("/api/v1/reviews/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateFeatureReviews({ reviewId, update }) {
  try {
    const response = await axios.patch(`/api/v1/reviews/${reviewId}`, update, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getAllReviews(page) {
  try {
    const response = await axios.get(`/api/v1/reviews?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
