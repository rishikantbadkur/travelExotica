import axios from "../apiFearures/axiosInstance";

export async function getBookingStats(year, month) {
  try {
    const response = await axios.get(
      `/api/v1/bookings/stats?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getAllBookings(year, month, pageCount) {
  try {
    const response = await axios.get(
      `/api/v1/bookings?year=${year}&month=${month}&page=${pageCount}`,
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

export async function cancelBooking({ bookingId, remarks, owner, date }) {
  try {
    const response = await axios.patch(
      `/api/v1/bookings/${bookingId}`,
      {
        active: false,
        cancellationDetails: {
          remarks: remarks,
          owner: owner,
          date: date,
        },
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

export async function getBookingByUserMail(userMail) {
  try {
    const response = await axios.get(
      `/api/v1/bookings/userEmail/${userMail}`,

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
