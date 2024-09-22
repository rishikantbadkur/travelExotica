import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "../../UI/Button/Button";
import styles from "./EnquiryForm.module.css";
import { UserContext } from "../../users/UserProvider";
import { tourQuery } from "../../../features/apiFearures/toursApiFeatures";
import toast from "react-hot-toast";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";

const EnquiryForm = ({ tour }) => {
  const { userState } = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: tourQuery,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Success");
        setSuccess(true);
      }
    },
    onError: (error) => {
      setSuccess(false);
      toast.error(error.message);
    },
  });

  const formSubmitHandler = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.enquiry_form_body}>
      <form
        className={styles.enquiry_form}
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <input
          className={styles.enquiry_form_fields}
          type="text"
          readOnly
          value={tour.name}
          name="tourName"
          {...register("tourName")}
        />
        <label htmlFor="name"></label>
        <input
          required
          className={styles.enquiry_form_fields}
          placeholder="Enter yor Name"
          defaultValue={!userState.authenticated ? "" : userState.user[0].name}
          type="text"
          id="name"
          name="name"
          {...register("username")}
        ></input>
        <label htmlFor="email"></label>

        <input
          required
          className={styles.enquiry_form_fields}
          placeholder="Enter your email"
          defaultValue={!userState.authenticated ? "" : userState.user[0].email}
          type="email"
          id="email"
          name="email"
          {...register("email")}
        ></input>

        <label htmlFor="query"></label>

        <textarea
          required
          className={styles.enquiry_form_fields}
          name="message"
          id="query"
          placeholder="Your message"
          {...register("queryText")}
        ></textarea>
        {success && (
          <p className={styles.success_text}>
            Thanks for writing to us, we will get back to you shortly..
          </p>
        )}
        <Button
          disabled={
            mutation.status === "pending" || mutation.status === "success"
          }
        >
          {mutation.status === "pending" ? <SpinnerMini /> : "SEND REQUEST"}
        </Button>
      </form>
    </div>
  );
};

export default EnquiryForm;
