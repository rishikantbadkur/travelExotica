import styles from "./AdminLogin.module.css";
import stylesGeneral from "../../../styles/general.module.css";

import LoginFormTemplate from "../../UI/LoginFormTemplate/LoginFormTemplate";
import useAdminLogin from "./useAdminLogin";

function AdminLogin() {
  const [register, handleSubmit, mutation, formSubmitHandler] = useAdminLogin();

  return (
    <section className={styles.wrapper}>
      <div className={styles.logo_ctn}>
        <a className={stylesGeneral.header__logo} href="/app/home">
          <aside>
            trav-el-
            <span className={stylesGeneral.text_highlight}>Exotica</span>
          </aside>
        </a>
      </div>
      <div className={styles.ctn}>
        <LoginFormTemplate
          register={register}
          handleSubmit={handleSubmit}
          mutation={mutation}
          formSubmitHandler={formSubmitHandler}
        />
      </div>
    </section>
  );
}

export default AdminLogin;
