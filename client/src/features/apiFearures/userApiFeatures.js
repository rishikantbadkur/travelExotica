import axios from "./axiosInstance";

export async function getMe() {
  const token = localStorage.getItem("travelExoticaJwt");

  if (!token) {
    return null;
  }

  try {
    const response = await axios.get("/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function login({ useremail, password }) {
  try {
    const response = await axios.post("/api/v1/users/login", {
      email: useremail,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function registerUser(data) {
  try {
    const response = await axios.post("/api/v1/users/signup", {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function forgotPassword({ email }) {
  try {
    const response = await axios.post("/api/v1/users/forgotPassword", {
      email: email,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function resetPassword({ password, passwordConfirm, token }) {
  try {
    const response = await axios.patch(`/api/v1/users/resetPassword/${token}`, {
      password: password,
      passwordConfirm: passwordConfirm,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updatePassword({ data }) {
  const token = localStorage.getItem("travelExoticaJwt");

  try {
    const response = await axios.patch("/api/v1/users/updatePassword", data, {
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
