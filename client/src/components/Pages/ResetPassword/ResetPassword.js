import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { resetPassword } from "../../../features/apiFearures/userApiFeatures";
import Button from "../../UI/Button/Button";
import styles from "./ResetPassword.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import toast from "react-hot-toast";
import SpinnerMini from "../../UI/SpinnerMini/SpinnerMini";

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      if (!(res.status === "success")) {
        return;
      }

      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitHandler = (data) => {
    data.token = params.token;

    if (data.token?.length === 0) {
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
      <section className={styles.wrapper}>
        <main className={styles.container}>
          <div className={styles.container_div}>
            <div>
              <h2>Reset your password</h2>
            </div>
            <form
              className={styles.form}
              onSubmit={handleSubmit(submitHandler)}
            >
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New password"
                required
                {...register("password")}
              ></input>
              <label htmlFor="confirmPassword"></label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="Confirm password"
                {...register("passwordConfirm")}
              ></input>
              <div className={styles.btn_container}>
                <aside>
                  <Button disabled={mutation.status === "success"}>
                    {mutation.status === "pending" ? <SpinnerMini /> : "Next"}
                  </Button>
                </aside>
                {mutation.status === "success" && (
                  <aside>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                      <Button btnSub={true}>Home</Button>
                    </Link>
                  </aside>
                )}
                {mutation.status === "error" && (
                  <aside>
                    <Link to="/app/login" style={{ textDecoration: "none" }}>
                      <Button btnSub={true}>Try Again</Button>
                    </Link>
                  </aside>
                )}
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

export default ResetPassword;
