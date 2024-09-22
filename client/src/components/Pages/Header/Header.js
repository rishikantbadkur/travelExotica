import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../users/UserProvider";

import Navigation from "../../helpers/Navigation/Navigation";
import styles from "./Header.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Button from "../../UI/Button/Button";
import toast from "react-hot-toast";
import HeaderLogout from "./HeaderLogout";
import Modal from "../../UI/Modal/Modal";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [logOutMenu, setLogOutMenu] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const { userState, setUserState, isLoading } = useContext(UserContext);

  const url = `${window.location.href}`.split("/").pop();

  function handleLinkClick() {
    if (toggle === false) return;

    setToggle(false);
  }

  function loginClickHandler() {
    navigate("/app/login");
  }

  function logoutClickHandler(e) {
    e.preventDefault();

    setIsModelOpen(true);
  }

  function logoutMenuToggle() {
    setLogOutMenu((prev) => !prev);
  }

  function modalCloseHandler() {
    setIsModelOpen(false);
  }

  function logoutHandler() {
    localStorage.removeItem("travelExoticaJwt");
    setLogOutMenu(false);
    // setAuthenticated(false);
    // setUser([]);
    setUserState({ user: [], authenticated: false });
    navigate("/app/logout");
    toast.success("Successfully Logged Out");

    setIsModelOpen(false);
  }

  return (
    <>
      {isModelOpen && (
        <Modal
          btnText="LOG OUT"
          isOpen={isModelOpen}
          onClose={modalCloseHandler}
          onTrue={logoutHandler}
          logOutModal={true}
        >
          Are you sure you want to log out?
        </Modal>
      )}
      <motion.div
        className={styles.header}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <a className={stylesGeneral.header__logo} href="/app/home">
          <aside>
            trav-el-
            <span className={stylesGeneral.text_highlight}>Exotica</span>
          </aside>
        </a>
        <div className={styles.desktop_nav}>
          <Navigation></Navigation>
        </div>
        <AnimatePresence>
          {toggle && (
            <motion.div
              className={styles.mobile_nav_container}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ type: "tween" }}
              exit={{ x: "100%" }}
            >
              <Navigation
                mobile={true}
                onLinkClick={handleLinkClick}
              ></Navigation>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`${styles.btn_container}`}>
          {!userState.authenticated && url !== "login" && !isLoading ? (
            <Button onClick={loginClickHandler}>LOGIN</Button>
          ) : (
            <Button onClick={loginClickHandler} visibility="hidden">
              LOGIN
            </Button>
          )}

          <div className={styles.profile}>
            {userState.authenticated && (
              <span className={styles.icon} onClick={logoutMenuToggle}>
                <ion-icon name="person-circle-outline"></ion-icon>
              </span>
            )}
            {logOutMenu && (
              <HeaderLogout
                logOutHandler={logoutClickHandler}
                toggleLogoutMenu={logoutMenuToggle}
              ></HeaderLogout>
            )}
          </div>

          <div
            className={styles.hamburger_icon}
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? (
              <ion-icon name="close"></ion-icon>
            ) : (
              <ion-icon name="menu"></ion-icon>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
