import axios from "./axiosInstance";

const QUERY_FIELDS = [
  "name",
  "duration",
  "price",
  "summary",
  "startLocation",
  "locations",
  "startDates",
  "slug",
  "keywords",
  "difficulty",
  "ratingsAverage",
  "feature",
];

export async function getAllTours(feature) {
  const queries = QUERY_FIELDS.join(",");
  try {
    if (feature) {
      const response = await axios.get(
        `/api/v1/tours?fields=${queries}&feature=${true}`
      );

      return response.data;
    }

    const response = await axios.get(`/api/v1/tours?fields=${queries}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getTour(tourId) {
  try {
    const response = await axios.get(`/api/v1/tours/${tourId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function tourQuery({ queryText, username, tourName, email }) {
  try {
    const response = await axios.post("api/v1/tours/tourQuery", {
      queryText,
      username,
      tourName,
      email,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
