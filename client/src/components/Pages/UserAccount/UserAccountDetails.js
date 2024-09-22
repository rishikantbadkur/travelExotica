import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { UserContext } from "../../users/UserProvider";
import { updatePassword } from "../../../features/apiFearures/userApiFeatures";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./UserAccountDetails.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import Button from "../../UI/Button/Button";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";
import { useNavigate } from "react-router-dom";

function UserAccountDetails() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { userState, isLoading, error } = useContext(UserContext);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      if (res.status === "success") {
        localStorage.setItem("travelExoticaJwt", res.token);
        toast.success("Password changed successfully");
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        return;
      }

      toast.error("Something went wrong, please try again later");
    },

    onError: (error) => {
      return toast.error(error.message);
    },
  });

  function submitHandler() {
    if (
      password.trim().length === 0 ||
      newPassword.trim().length === 0 ||
      confirmNewPassword.trim().length === 0
    ) {
      return toast.error(
        "Current Password, New Password and Confirm Password are required field"
      );
    }
    if (password.trim().length < 8) {
      return toast.error("Current password is incorrect");
    }

    if (newPassword.trim().length < 8) {
      return toast.error("New password should have at least 8 characters");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("New password and confirm password does not match");
    }

    mutation.mutate({
      data: {
        passwordCurrent: password,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      },
    });
  }

  if (isLoading) {
    return (
      <section style={{ height: "100vh", width: "100vw", maxWidth: "135rem" }}>
        <Spinner></Spinner>
      </section>
    );
  }

  if (error) {
    toast.error("Something went wrong while fetching the account details");
  }

  if (userState?.user.length === 0) {
    navigate("/app/login");
    return;
  }

  return (
    <>
      {userState.user.length > 0 && (
        <section className={styles.section_ctn}>
          <div className={styles.wrapper}>
            <div className={styles.header_text}>
              <p>
                User <span style={{ color: "#ffd205" }}>Details</span>
              </p>
            </div>
            <div className={styles.text_user}>
              <div className={styles.user_feature}>
                <label className={stylesGeneral.body__text}>Name : </label>
                <input defaultValue={userState?.user[0].name} readOnly />
              </div>
              <div className={styles.user_feature}>
                <label
                  className={stylesGeneral.body__text}
                  style={{ marginRight: "0.5rem" }}
                >
                  Email :{" "}
                </label>
                <input defaultValue={userState?.user[0].email} readOnly />
              </div>
              <div className={styles.img_ctn}>
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
            </div>
            <div className={styles.password}>
              <div>
                <h2
                  className={`${stylesGeneral.body__text} ${styles.custom_text}`}
                >
                  Update your password
                </h2>
              </div>

              <div className={styles.user_feature}>
                <label className={stylesGeneral.body__text}>
                  Current password :{" "}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.user_feature}>
                <label
                  className={stylesGeneral.body__text}
                  style={{ marginRight: "3.1rem" }}
                >
                  New Password :{" "}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className={styles.user_feature}>
                <label
                  className={stylesGeneral.body__text}
                  style={{ marginRight: "-0.2rem" }}
                >
                  Confirm Password :
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <span className={styles.btn_ctn}>
                <Button
                  onClick={submitHandler}
                  disabled={mutation.status === "pending"}
                >
                  Submit
                </Button>
              </span>
              {mutation.status === "pending" ? (
                <span>
                  <SpinnerMini />
                </span>
              ) : (
                "  "
              )}
            </div>
          </div>
        </section>
      )}
      {/* <Footer></Footer> */}
    </>
  );
}

export default UserAccountDetails;
