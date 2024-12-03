import axios from "../apiFearures/axiosInstance";

export async function updateFeatureTours({ tourId, action, data }) {
  try {
    const response = await axios.patch(
      `/api/v1/tours/feature/${tourId}?action=${action}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
