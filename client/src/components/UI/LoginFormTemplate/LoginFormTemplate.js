import React from "react";

import styles from "./LoginFormTemplate.module.css";
import SpinnerMini from "../SpinnerMini/SpinnerMini";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function LoginFormTemplate({
  handleSubmit,
  register,
  formSubmitHandler,
  mutation,
}) {
  return (
    <div className={styles.container}>
      <form
        className={styles.enquiry_form}
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <label htmlFor="name"></label>

        <input
          className={styles.enquiry_form_fields}
          placeholder="Enter your email"
          type="email"
          id="useremail"
          name="useremail"
          {...register("useremail")}
          required
        ></input>
        <label htmlFor="password"></label>

        <input
          className={styles.enquiry_form_fields}
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          {...register("password")}
          required
        ></input>

        <Button disabled={mutation.status === "pending"} type="submit">
          {mutation.status === "pending" ? (
            <SpinnerMini></SpinnerMini>
          ) : (
            "LOGIN"
          )}
        </Button>
      </form>
      <div className={styles.forgotPassword_ctn}>
        <Link style={{ textDecoration: "none" }} to="/app/forgetpassword">
          Forgot password ?
        </Link>
      </div>
    </div>
  );
}

export default LoginFormTemplate;
