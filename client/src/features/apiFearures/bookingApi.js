import axios from "./axiosInstance";

export async function createOrder({
  amount,
  currency,
  receipt,
  username,
  useremail,
}) {
  const KEY = process.env.RAZORPAY_KEY;
  const token = localStorage.getItem("travelExoticaJwt");

  let isPaymentSuccessful = false;

  try {
    const initialresponse = await axios.post(
      "/api/v1/bookings/order",
      {
        amount: amount * 100,
        currency: currency,
        receipt: receipt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return new Promise((resolve, reject) => {
      const options = {
        key: KEY,
        amount: initialresponse.data.order.amount.toString(),
        currency: currency,
        name: "Travel Exotica - Tours and Travels",
        description: "Test Transaction",
        // image: { logo },
        order_id: initialresponse.data.order.id,
        handler: async function (response) {
          const data = {
            orderCreationId: initialresponse.data.order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const result = await axios.post("/api/v1/bookings/verify", data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            resolve(result);
            isPaymentSuccessful = true;
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: () => {
            if (!isPaymentSuccessful) {
              reject("payment-cancel");
            }
          },
        },
        prefill: {
          name: username,
          email: useremail,
          contact: "9999999999",
        },
        notes: {
          address:
            "Travel Exotica, Tours and Travels, 101 Raveline street, Indore (M.P.) 452010",
        },
        theme: {
          color: "#1bbc9b",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        reject(response.error);
      });
      paymentObject.open();
    });
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Please login again to continue", 401);
    }

    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function createBooking(data) {
  const token = localStorage.getItem("travelExoticaJwt");

  try {
    const response = await axios.post("/api/v1/bookings/post", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function findBookings(userId) {
  try {
    const bookings = await axios.get(`/api/v1/bookings/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("travelExoticaJwt")}`,
      },
    });

    return bookings?.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || error.message);
  }
}
