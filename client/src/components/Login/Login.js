import { useState } from "react";

import usesWindowScroll from "../../hooks/useWindowScroll";
import LoginForm from "../helpers/LoginForm/LoginForm";
import styles from "./Login.module.css";
import stylesGeneral from "../../styles/general.module.css";
import Button from "../UI/Button/Button";
import RegisterForm from "../helpers/RegisterForm/RegisterForm";
import Footer from "../Pages/Footer/Footer";
import Header from "../Pages/Header/Header";

function Login() {
  const [form, setForm] = useState(false);
  usesWindowScroll();

  function setFormHandler() {
    setForm((prev) => !prev);
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper_box}>
        <section className={styles.login}>
          {!form && (
            <>
              <LoginForm />

              <div className={styles.register}>
                <p
                  className={`${stylesGeneral.body__text} ${styles.margin_ctn}`}
                >
                  Don't have an account ?
                </p>
                <Button
                  onClick={setFormHandler}
                  className={styles.btn_custom}
                  btnSub={true}
                >
                  SIGN UP
                </Button>
              </div>
            </>
          )}

          {form && (
            <>
              <RegisterForm />
              <div className={styles.register}>
                <p className={stylesGeneral.body__text}>
                  Already have an Account!
                </p>
                <Button
                  onClick={setFormHandler}
                  className={styles.btn_custom}
                  btnSub={true}
                >
                  LOGIN
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Login;
