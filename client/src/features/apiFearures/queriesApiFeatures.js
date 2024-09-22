import axios from "./axiosInstance";

export async function createUserQuery(data) {
  try {
    const response = await axios.post("/api/v1/queries", data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
