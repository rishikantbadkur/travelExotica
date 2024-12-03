import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteUser,
  updateUser,
} from "../../../../../features/adminApi/userFeatures";
import toast from "react-hot-toast";

function useUserUpdate() {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      toast.success("Success");
      setName("");
      setUserEmail("");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (res) => {
      toast.success("Success");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteUserHandler = (userId) => {
    const flag = window.confirm("Are you sure, you want to delete this user?");

    if (!flag) {
      return;
    }

    deleteMutation.mutate({ userId });
  };

  const nameChangeHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const formSubmitHandler = (userId) => {
    if (name.trim().length === 0 && userEmail.trim().length === 0) {
      return toast.error("Please provide Name or Email to update");
    }
    if (name && name.trim().length < 4) {
      return toast.error("Name should be of greater than 4 characters");
    }
    mutation.mutate({ userId, name, userEmail });
  };

  return [
    name,
    nameChangeHandler,
    userEmail,
    emailChangeHandler,
    formSubmitHandler,
    mutation,
    setName,
    setUserEmail,
    deleteMutation,
    deleteUserHandler,
  ];
}

export default useUserUpdate;
