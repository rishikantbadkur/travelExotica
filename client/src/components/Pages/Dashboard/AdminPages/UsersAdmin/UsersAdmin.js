import styles from "./UsersAdmin.module.css";
import UserList from "./UserList";
import UserInfo from "./UserInfo";
import useUsersData from "./useUsersData";
import { useState } from "react";
import useUserUpdate from "./useUserUpdate";
import StatBox from "../UI/StatBox/StatBox";
import Button from "../../../../UI/Button/Button";
import CreateUserModal from "../UI/Modal/CreateUserModal/CreateUserModal";
import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "../../../../../features/adminApi/userFeatures";

function UsersAdmin() {
  const [userId, setUserId] = useState();
  const [enabled, setEnabled] = useState(false);
  const [emailUser, showEmailUser] = useState(false);
  const [email, setEmail] = useState("");
  const [formToggle, setFormToggle] = useState(false);
  const [newUserToggle, setNewUserToggle] = useState(false);

  const [
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
  ] = useUserUpdate();

  const [
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
  ] = useUsersData(
    userId,
    enabled,
    email,
    emailUser,
    setEnabled,
    showEmailUser
  );

  const { data: userStatData, isLoading: isUserStatLoading } = useQuery({
    queryKey: ["userStat"],
    queryFn: getUserStats,
  });

  const userClickHandler = (userId) => {
    showEmailUser(false);
    setEmail("");
    setName("");
    setUserEmail("");
    setFormToggle(false);
    setUserId(userId);
    setEnabled(true);
  };

  return (
    <section className={styles.wrapper}>
      {userStatData && !isUserStatLoading && (
        <div className={styles.stat_ctn}>
          <StatBox
            feature={{
              name: "Total Users",
              icon: <ion-icon name="people-outline"></ion-icon>,
              color: "#ae1245",
              bgColor: "#f7d0dd",
              value: userStatData.totalUsers,
            }}
          />
          <StatBox
            feature={{
              name: "Active Users",
              icon: <ion-icon name="people-outline"></ion-icon>,
              color: "#9925c0",
              bgColor: "#f2d5fc",
              value: userStatData.totalUserWithBookings,
            }}
          />
          <StatBox
            feature={{
              name: "Booking %",
              icon: <ion-icon name="podium-outline"></ion-icon>,
              color: "#2e7a13",
              bgColor: "#d7ebd1",
              value: `${Math.round(
                (userStatData.totalUserWithBookings / userStatData.totalUsers) *
                  100
              )} %`,
            }}
          />
          <StatBox
            feature={{
              name: "Booking per User",
              icon: <ion-icon name="man-outline"></ion-icon>,
              color: "#3282c5",
              bgColor: "#d9ecfd",
              value: (
                userStatData.totalUserWithBookings / userStatData.totalUsers
              ).toFixed(1),
            }}
          />
        </div>
      )}
      <div className={styles.newUser_ctn}>
        <Button onClick={() => setNewUserToggle((prev) => !prev)}>New</Button>
      </div>
      {newUserToggle && (
        <CreateUserModal
          onClose={() => {
            setNewUserToggle();
          }}
        />
      )}
      <div className={styles.body_ctn}>
        <UserList
          usersData={usersData}
          isUsersLoading={isUsersLoading}
          usersLoadError={usersLoadError}
          setPageCount={setPageCount}
          setUsersType={setUsersType}
          onClick={userClickHandler}
        />
        <UserInfo
          emailUser={emailUser}
          email={email}
          setEmail={setEmail}
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
          userData={userData}
          isLoading={isLoading}
          error={error}
          userEmailData={userEmailData}
          userFromEmailLoading={userFromEmailLoading}
          errorFromEmailLoad={errorFromEmailLoad}
          btnSubmitHandler={btnSubmitHandler}
        />
      </div>
    </section>
  );
}

export default UsersAdmin;
