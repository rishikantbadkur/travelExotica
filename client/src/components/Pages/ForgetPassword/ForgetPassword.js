import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "../../../features/apiFearures/userApiFeatures";
import styles from "./ForgetPassword.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";
import toast from "react-hot-toast";
import Button from "../../UI/Button/Button";

export default function ForgetPassword() {
  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      if (!(res.status === "success")) {
        return;
      }

      toast.success("Password reset link has been sent to your email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitHandler = (data) => {
    if (data.email.length === 0) {
      return;
    }

    mutation.mutate(data);
  };

  return (
    <>
      <div className={styles.logo_ctn}>
        <div className={stylesGeneral.header__logo}>
          <aside>
            trav-el-
            <span className={stylesGeneral.text_highlight}>Exotica</span>
          </aside>
        </div>
      </div>

      <form className={styles.container} onSubmit={handleSubmit(submitHandler)}>
        <h2>Enter your Email to continue</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
          {...register("email")}
        ></input>

        <aside>
          <Button disabled={mutation.status === "success"}>
            {mutation.status === "pending" ? (
              <SpinnerMini></SpinnerMini>
            ) : (
              "Next"
            )}
          </Button>
        </aside>
      </form>
    </>
  );
}
