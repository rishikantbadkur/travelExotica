import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { login } from "../../../features/apiFearures/userApiFeatures";
import { UserContext } from "../../users/UserProvider";

import useTitle from "../../../hooks/useTitle";
import toast from "react-hot-toast";
import Button from "../../UI/Button/Button";
import styles from "./LoginForm.module.css";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";

function LoginForm() {
  const navigate = useNavigate();
  useTitle("Login");

  const { setUserState } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (!(res.status === "success")) {
        return;
      }

      setUserState({ user: [res.data.user], authenticated: true });
      localStorage.setItem("travelExoticaJwt", res.token);
      toast.success("Logged in Successfully");
      navigate("/app/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const formSubmitHandler = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
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
    </>
  );
}

export default LoginForm;
