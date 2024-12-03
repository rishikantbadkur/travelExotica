import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./components/Pages/HomePage/HomePage";
import AppLayout from "./components/Pages/AppLayout";
import Spinner from "./components/UI/Spinner/Spinner";

const Services = lazy(() => import("./components/Pages/Services/Services"));
const Contacts = lazy(() => import("./components/Pages/Contacts/Contacts"));
const Packages = lazy(() => import("./components/helpers/Packages/Packages"));

const AdminLogin = lazy(() =>
  import("./components/Pages/AdminLogin/AdminLogin")
);

const Statistics = lazy(() =>
  import("./components/Pages/Dashboard/AdminPages/Statistics/Statistics")
);

const ToursAdmin = lazy(() =>
  import("./components/Pages/Dashboard/AdminPages/ToursAdmin/ToursAdmin")
);
const UsersAdmin = lazy(() =>
  import("./components/Pages/Dashboard/AdminPages/UsersAdmin/UsersAdmin")
);
const BookingsAdmin = lazy(() =>
  import("./components/Pages/Dashboard/AdminPages/BookingsAdmin/BookingsAdmin")
);
const Settings = lazy(() =>
  import("./components/Pages/Dashboard/AdminPages/Settings/Settings")
);

const ReviewsAdmin = lazy(() =>
  import("./components/Pages/Dashboard/AdminPages/ReviewsAdmin/ReviewsAdmin")
);

const TourLanding = lazy(() =>
  import("./components/Pages/TourLanding/TourLanding")
);

const Layout = lazy(() => import("./components/Pages/Dashboard/Layout"));

const Blogs = lazy(() => import("./components/Pages/Blogs/Blogs"));
const Login = lazy(() => import("./components/Login/Login"));
const Logout = lazy(() => import("./components/Pages/Logout/Logout"));
const ForgetPassword = lazy(() =>
  import("./components/Pages/ForgetPassword/ForgetPassword")
);
const MyBooking = lazy(() => import("./components/Pages/MyBookings/MyBooking"));
const UserAccount = lazy(() =>
  import("./components/Pages/UserAccount/UserAccount")
);
const ResetPassword = lazy(() =>
  import("./components/Pages/ResetPassword/ResetPassword")
);
const WildSearch = lazy(() =>
  import("./components/Pages/WildSearch/WildSearch")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/app/home" replace></Navigate>}
          />
          <Route
            path="/app"
            element={<Navigate to="/app/home" replace></Navigate>}
          />
          <Route path="/app/admin/login" element={<AdminLogin />} />

          <Route path="/app/admin" element={<Layout />}>
            <Route
              path="*"
              element={
                <Suspense fallback={<Spinner />}>
                  <Routes>
                    <Route path="dashboard" element={<Statistics />} />
                    <Route path="tours" element={<ToursAdmin />} />
                    <Route path="users" element={<UsersAdmin />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="bookings" element={<BookingsAdmin />} />
                    <Route path="reviews" element={<ReviewsAdmin />} />
                  </Routes>
                </Suspense>
              }
            ></Route>
          </Route>
          <Route path="/app" element={<AppLayout></AppLayout>}>
            <Route path="home" element={<HomePage />} />
            <Route
              path="*"
              element={
                <Suspense fallback={<Spinner />}>
                  <Routes>
                    <Route path="services" element={<Services />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="tours" element={<Packages />} />
                    <Route
                      path="tours/:id/:tourSlug"
                      element={<TourLanding />}
                    />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="forgetpassword" element={<ForgetPassword />} />
                    <Route path="mybookings" element={<MyBooking />} />
                    <Route path="account" element={<UserAccount />} />

                    <Route
                      path="users/resetPassword/:token"
                      element={<ResetPassword />}
                    />
                    <Route path="*" element={<WildSearch />} />
                  </Routes>
                </Suspense>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1.6rem",
            maxWidth: "50rem",
            padding: "1.6rem 2.4rem",
            color: "#6e6e6e",
          },
        }}
      ></Toaster>
    </>
  );
}

export default App;
