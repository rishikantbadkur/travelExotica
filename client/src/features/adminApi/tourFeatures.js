import axiosInstance from "../apiFearures/axiosInstance";

export async function updateFeatureTours({ tourId, action, data }) {
  try {
    const response = await axiosInstance.patch(
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

export async function updateTour({ tourId, data }) {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/tours/${tourId}`,
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

export async function uploadTourImages(formData) {
  try {
    const response = await axiosInstance.post(
      "/api/v1/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export async function createTour(tourData) {
  try {
    const response = await axiosInstance.post("/api/v1/tours", tourData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteTour(tourId) {
  try {
    const response = await axiosInstance.delete(`/api/v1/tours/${tourId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getUpcomingTours() {
  try {
    const response = await axiosInstance.get("/api/v1/tours/getupcomingtours", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateTourDates({ tourId, tourDate }) {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/tours/updatetourdates`,
      {
        tourId,
        tourDate,
      },
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
