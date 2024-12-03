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

export async function getAllUsers(pageCount, usersType) {
  const token = localStorage.getItem("travelExoticaJwt");

  try {
    const response = await axios.get(
      `/api/v1/users?page=${pageCount}&sort=${usersType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getUser({ userId, email }) {
  try {
    const response = await axios.get(`/api/v1/users/${userId}?email=${email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateUser({ userId, name, userEmail }) {
  try {
    const response = await axios.patch(
      `/api/v1/users/${userId}`,
      {
        name: name,
        email: userEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteUser({ userId }) {
  try {
    const response = await axios.delete(`/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function createUser(data) {
  try {
    const response = await axios.post("/api/v1/users/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getUserStats() {
  try {
    const response = await axios.get("/api/v1/users/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
