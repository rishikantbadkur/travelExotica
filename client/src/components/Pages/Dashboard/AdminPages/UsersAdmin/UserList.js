import React from "react";

import styles from "./UserList.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";
import SpinnerMedium from "../../../../UI/SpinnerMedium/SpinnerMedium";

function UserList({
  usersData,
  isUsersLoading,
  usersLoadError,
  setPageCount,
  setUsersType,
  onClick,
}) {
  const nextPageHandler = () => {
    if (usersData.pagination.currentPage < usersData.pagination.totalPages) {
      setPageCount(usersData.pagination.currentPage + 1);
    }
  };

  const previousPageHandler = () => {
    if (usersData.pagination.currentPage > 1) {
      setPageCount(usersData.pagination.currentPage - 1);
    }
  };

  const userTypeChangeHandler = (e) => {
    setUsersType(e.target.value);
    setPageCount(1);
  };

  if (usersLoadError) {
    return (
      <section className={styles.section_load_ctn}>
        <p
          style={{ fontSize: "1.2rem", letterSpacing: "0.7px", color: "#000" }}
        >
          Something went wrong while fetching users data, please try again later
        </p>
      </section>
    );
  }
  return (
    <section className={styles.user_section}>
      <div className={styles.filter_section}>
        <span className={styles.sort_ctn}>
          <p className={`${styles.sortby} ${stylesGeneral.body__text}`}>
            sort by :
          </p>
        </span>

        <span className={styles.sort_param_ctn}>
          <select onChange={userTypeChangeHandler}>
            <option value="newest" className={styles.option}>
              Newest First
            </option>
            <option value="oldest" className={styles.option}>
              Oldest First
            </option>
            <option value="bookingsHighToLow" className={styles.option}>
              Bookings - High to Low
            </option>
            <option value="bookingsLowToHigh" className={styles.option}>
              Bookings - Low to High
            </option>
          </select>
        </span>
      </div>
      {isUsersLoading ? (
        <section className={styles.section_load_ctn}>
          <SpinnerMedium />
        </section>
      ) : (
        <>
          <div className={styles.paginate_ctn}>
            <span style={{ letterSpacing: "0.5px" }}>
              <p>
                Showing{" "}
                {(usersData.pagination.currentPage - 1) *
                  usersData.pagination.resultsPerPage +
                  1}{" "}
                -{" "}
                {usersData.pagination.currentPage ===
                usersData.pagination.totalPages
                  ? usersData.pagination.resultsPerPage *
                      (usersData.pagination.currentPage - 1) +
                    usersData.results
                  : usersData.pagination.resultsPerPage *
                    usersData.pagination.currentPage}{" "}
                of {usersData.pagination.totalUsers} results
              </p>
            </span>
            <span style={{ letterSpacing: "0.5px" }}>
              <p>
                Page {usersData.pagination.currentPage} of{" "}
                {usersData.pagination.totalPages}
              </p>
            </span>
          </div>

          <div className={styles.ctn}>
            {usersData.data.map((user) => (
              <div
                className={styles.user_ctn}
                key={user._id}
                onClick={() => onClick(user._id)}
              >
                <div className={styles.user_img}>
                  <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <div className={styles.user_body_ctn}>
                  <div className={styles.user_body_name}>
                    <span
                      className={`${stylesGeneral.body__text} ${styles.color}`}
                    >
                      {user.name}
                    </span>
                    <span
                      className={styles.font_size}
                      style={{ letterSpacing: "0.5px" }}
                    >
                      {user.email}
                    </span>
                  </div>
                  <div className={styles.user_body_info}>
                    <span className={`${stylesGeneral.body__text}`}>
                      Bookings
                    </span>
                    <span className={`${styles.color} ${styles.font_size}`}>
                      {user.numOfBookings}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!isUsersLoading && (
        <div className={styles.btn_ctn}>
          <button className={styles.btn} onClick={previousPageHandler}>
            Prev
          </button>

          <button className={styles.btn} onClick={nextPageHandler}>
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default UserList;
