import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import UserAccountDetails from "./UserAccountDetails";
import useTitle from "../../../hooks/useTitle";
import useWindowScroll from "../../../hooks/useWindowScroll";

function UserAccount() {
  useTitle("Account");
  useWindowScroll();

  return (
    <>
      <Header />
      <UserAccountDetails />
      <Footer />
    </>
  );
}

export default UserAccount;
