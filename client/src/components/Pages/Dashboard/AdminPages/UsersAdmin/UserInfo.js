import styles from "./UserInfo.module.css";
import UserCard from "./UserCard";

import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";

function UserInfo({
  emailUser,
  email,
  setEmail,
  formToggle,
  setFormToggle,
  name,
  nameChangeHandler,
  userEmail,
  emailChangeHandler,
  formSubmitHandler,
  mutation,
  deleteMutation,
  deleteUserHandler,
  userData,
  isLoading,
  error,
  userEmailData,
  userFromEmailLoading,
  errorFromEmailLoad,
  btnSubmitHandler,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.ctn}>
        <form className={styles.search_ctn}>
          <input
            type="email"
            placeholder="Search by email"
            value={email}
            className={styles.search_input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className={styles.search_btn_ctn} onClick={btnSubmitHandler}>
            <ion-icon name="search"></ion-icon>
          </button>
        </form>
      </div>
      {isLoading || userFromEmailLoading ? (
        <div className={styles.loading_fallback}>
          <SpinnerMedium />
        </div>
      ) : emailUser ? (
        <UserCard
          userData={userEmailData}
          error={errorFromEmailLoad}
          formToggle={formToggle}
          setFormToggle={setFormToggle}
          name={name}
          nameChangeHandler={nameChangeHandler}
          userEmail={userEmail}
          emailChangeHandler={emailChangeHandler}
          formSubmitHandler={formSubmitHandler}
          mutation={mutation}
          deleteMutation={deleteMutation}
          deleteUserHandler={deleteUserHandler}
        />
      ) : (
        <UserCard
          userData={userData}
          error={error}
          formToggle={formToggle}
          setFormToggle={setFormToggle}
          name={name}
          nameChangeHandler={nameChangeHandler}
          userEmail={userEmail}
          emailChangeHandler={emailChangeHandler}
          formSubmitHandler={formSubmitHandler}
          mutation={mutation}
          deleteMutation={deleteMutation}
          deleteUserHandler={deleteUserHandler}
        />
      )}
    </section>
  );
}

export default UserInfo;
