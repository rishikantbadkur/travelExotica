import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function AppLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
