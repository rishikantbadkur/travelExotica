import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { UserContext } from "../../users/UserProvider";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../features/apiFearures/userApiFeatures";
import toast from "react-hot-toast";

function useUserLogin() {
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

  return [register, handleSubmit, mutation, formSubmitHandler];
}

export default useUserLogin;
