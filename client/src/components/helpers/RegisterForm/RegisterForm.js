import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { UserContext } from "../../users/UserProvider";
import { registerUser } from "../../../features/apiFearures/userApiFeatures";

import styles from "./RegisterForm.module.css";
import Button from "../../UI/Button/Button";
import toast from "react-hot-toast";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";
import useTitle from "../../../hooks/useTitle";

function RegisterForm() {
  const { register, handleSubmit } = useForm();

  const { setUserState } = useContext(UserContext);

  const navigate = useNavigate();
  useTitle("Sign up");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (!(res.status === "success")) {
        return;
      }

      setUserState({
        user: [res.data.user],
        authenticated: true,
      });
      localStorage.setItem("travelExoticaJwt", res.token);
      toast.success("Signed up Successfully");
      navigate("/app/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function formSubmitHandler(data) {
    mutation.mutate(data);
  }

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.enquiry_form}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <label htmlFor="email"></label>
          <input
            className={styles.enquiry_form_fields}
            {...register("email")}
            placeholder="Enter your Email"
            type="email"
            id="email"
            name="email"
            required
          ></input>

          <label htmlFor="name"></label>
          <input
            className={styles.enquiry_form_fields}
            {...register("name")}
            placeholder="Full Name"
            type="text"
            id="name"
            name="name"
            required
          ></input>

          <label htmlFor="password"></label>
          <input
            className={styles.enquiry_form_fields}
            {...register("password")}
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            required
          ></input>

          <label htmlFor="passwordConfirm"></label>
          <input
            className={styles.enquiry_form_fields}
            {...register("passwordConfirm")}
            placeholder="Confirm Password"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            required
          ></input>

          <Button disabled={mutation.status === "pending"}>
            {mutation.status === "pending" ? (
              <SpinnerMini></SpinnerMini>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
