import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllUsers,
  getUser,
} from "../../../../../features/adminApi/userFeatures";
import toast from "react-hot-toast";

function useUsersData(
  userId,
  enabled,
  email,
  emailUser,
  setEnabled,
  showEmailUser
) {
  const [pageCount, setPageCount] = useState(1);
  const [usersType, setUsersType] = useState("newest");

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return getUser({ userId });
    },
    enabled: enabled,
  });

  const {
    data: userEmailData,
    isLoading: userFromEmailLoading,
    error: errorFromEmailLoad,
    refetch,
  } = useQuery({
    queryKey: ["user", "email"],
    queryFn: () => {
      return getUser({ email, userId: 0 });
    },
    enabled: emailUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const btnSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || !email.includes("@")) {
      return toast.error("Please enter a valid Email");
    }
    setEnabled(false);
    showEmailUser(true);
    refetch();
  };

  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersLoadError,
  } = useQuery({
    queryKey: [`All Users-${usersType}`, pageCount],
    queryFn: () => {
      return getAllUsers(pageCount, usersType);
    },
  });
  return [
    setPageCount,
    setUsersType,
    usersData,
    isUsersLoading,
    usersLoadError,
    userData,
    isLoading,
    error,
    userEmailData,
    userFromEmailLoading,
    errorFromEmailLoad,
    btnSubmitHandler,
  ];
}

export default useUsersData;
