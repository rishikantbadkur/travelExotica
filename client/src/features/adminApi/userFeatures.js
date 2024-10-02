import axios from "../apiFearures/axiosInstance";

export async function adminLogin({ useremail, password }) {
  try {
    const response = await axios.post("/api/v1/users/adminLogin", {
      email: useremail,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}
