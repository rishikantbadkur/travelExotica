import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import styles from "./ContactForm.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import { createUserQuery } from "../../../features/apiFearures/queriesApiFeatures";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";

const ContactForm = () => {
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: createUserQuery,
    onSuccess: (res) => {
      if (res.status === "success") {
        setSuccess(true);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setSuccess(false);
    },
  });

  const { register, handleSubmit } = useForm();

  const formSubmitHandler = (data) => {
    if (!data.name === 0 || !data.email === 0 || !data.message === 0) {
      toast.error("Name, Email and message are required");
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.form_container_sub}>
        <div className={styles.form_header}>
          <h6
            className={`${stylesGeneral.heading_decorative} ${styles.body_margin}`}
          >
            Get in Touch
          </h6>

          <h1
            className={`${stylesGeneral.heading_quaternary} ${styles.form_header_main} ${styles.body_margin}`}
          >
            Plan your Next Trip
          </h1>
          <p className={`${stylesGeneral.body__text} ${styles.body_margin}`}>
            Write to us for personalized travel advice or for information on
            group travel and last minute travel, all travel is insured and safe.
          </p>
        </div>
        <form
          className={styles.enquiry_form}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <label htmlFor="name"></label>
          <input
            className={styles.enquiry_form_fields}
            placeholder="Enter your full name"
            type="text"
            id="name"
            name="name"
            required
            {...register("name")}
          ></input>
          <label htmlFor="email"></label>

          <input
            className={styles.enquiry_form_fields}
            placeholder="Enter your email"
            type="email"
            id="email"
            name="email"
            required
            {...register("email")}
          ></input>

          <label htmlFor="query"></label>

          <textarea
            className={`${styles.enquiry_form_fields} ${styles.enquiry_textarea}`}
            name="message"
            id="query"
            placeholder="Your message"
            {...register("message")}
          ></textarea>
          {success && (
            <p className={styles.success_text}>
              Thankyou for reaching out, we will get back to you shortly.
            </p>
          )}
          <button
            className={stylesGeneral.btn_general}
            disabled={mutation.status === "pending" || success}
          >
            {mutation.status === "pending" ? (
              <span
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "inline-block",
                }}
              >
                <SpinnerMini />
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
