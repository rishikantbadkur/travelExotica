import React from "react";
import ModalWrapper from "../ModalWrapper";

import styles from "./CreateUserModal.module.css";
import Button from "../../../../../../UI/Button/Button";
import SpinnerMini from "../../../../../../UI/SpinnerMedium/SpinnerMedium";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../../../../../features/adminApi/userFeatures";
import toast from "react-hot-toast";

function CreateUserModal({ onClose }) {
  const { register, handleSubmit } = useForm();

  const formSubmitHandler = (data) => {
    mutation.mutate({
      ...data,
      role: data.role.toLowerCase(),
    });
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      if (res.status === "success") {
        // console.log(res);
        toast.success("User created successfully");

        onClose();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <ModalWrapper>
      <div className={styles.modal_ctn}>
        <div className={styles.close_ctn} onClick={onClose}>
          <ion-icon name="close"></ion-icon>
        </div>
        <div className={styles.container}>
          <form
            className={styles.enquiry_form}
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <label htmlFor="email"></label>
            <input
              className={styles.enquiry_form_fields}
              {...register("email")}
              placeholder="Enter Email Address"
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

            <span></span>
            <select
              className={styles.enquiry_form_fields}
              required
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* <Button disabled={mutation.status === "pending"}>
            {mutation.status === "pending" ? (
              <SpinnerMini></SpinnerMini>
            ) : (
              "Sign up"
            )}
          </Button> */}
            <span></span>
            <Button>Create</Button>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default CreateUserModal;
