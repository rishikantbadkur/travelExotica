import styles from "./UserCard.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";
import Button from "../../../../UI/Button/Button";
import SpinnerMini from "../../../../UI/SpinnerMini/SpinnerMini";

function UserCard({
  userData,
  error,
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
}) {
  if (error) {
    return (
      <section className={styles.section_load_ctn}>
        <p
          style={{
            fontSize: "1.2rem",
            letterSpacing: "0.7px",
            lineHeight: "2rem",
            color: "#000",
          }}
        >
          {error.message ||
            "Something went wrong while fetching user data, please try again later."}
        </p>
      </section>
    );
  }

  return (
    <>
      {userData ? (
        <div className={styles.ctn}>
          <div className={styles.card}>
            <div className={styles.head_ctn}>
              <span className={styles.img_ctn}>
                <ion-icon name="person-circle-outline"></ion-icon>
              </span>

              <span
                className={styles.role_ctn}
                style={{
                  backgroundColor:
                    userData.data[0].role === "user" ? "#ffd205" : "#FF8A8A",
                }}
              >
                {userData.data[0].master
                  ? `super admin`
                  : userData.data[0].role}
              </span>
            </div>
            <div className={styles.body_ctn}>
              <p className={stylesGeneral.body__text}>
                <span className={styles.color_black}>Name :</span>{" "}
                {userData.data[0].name}
              </p>

              <p className={stylesGeneral.body__text}>
                <span className={styles.color_black}>Email :</span>{" "}
                {userData.data[0].email}
              </p>

              <p className={stylesGeneral.body__text}>
                <span className={styles.color_black}>Account Created :</span>{" "}
                {String(
                  new Date(userData.data[0].createdAt).toLocaleDateString()
                )
                  .split("/")
                  .join("-")}
              </p>

              <span className={styles.tour_info_ctn}>
                <p className={stylesGeneral.body__text}>
                  <span className={styles.color_black}>Tours Booked :</span>
                </p>{" "}
                <aside>
                  {userData.data[0].bookings.length > 0 ? (
                    userData.data[0].bookings.map((booking) => (
                      <p className={stylesGeneral.body__text} key={booking._id}>
                        {booking.tour.name || "Null"}
                      </p>
                    ))
                  ) : (
                    <p className={stylesGeneral.body__text}>Null</p>
                  )}
                </aside>
              </span>

              <p className={stylesGeneral.body__text}>
                <span className={styles.color_black}>Total Revenue :</span>{" "}
                {userData.data[0].bookingsCount > 1 ? (
                  <>
                    <span>&#x20B9;</span>&nbsp;{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(
                      userData.data[0].bookings.reduce((acc, crr) => {
                        return acc + crr.price;
                      }, 0)
                    )}
                  </>
                ) : userData.data[0].bookings[0]._id ? (
                  <>
                    <span>&#x20B9;</span>&nbsp;
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(
                      userData.data[0].bookings.reduce((acc, crr) => {
                        return acc + crr.price;
                      }, 0)
                    )}
                  </>
                ) : (
                  "Null"
                )}
              </p>

              <div className={styles.btn_ctn}>
                <Button
                  onClick={() => {
                    setFormToggle((prev) => !prev);
                  }}
                >
                  Update
                </Button>
                <span className={styles.delete_button}>
                  <Button
                    btnSub={true}
                    onClick={() => deleteUserHandler(userData.data[0]._id)}
                  >
                    Delete
                  </Button>
                  {deleteMutation.status === "pending" ? (
                    <span>
                      <SpinnerMini></SpinnerMini>
                    </span>
                  ) : null}
                </span>
              </div>

              {formToggle && (
                <div className={styles.update_ctn}>
                  <form>
                    <span className={styles.content_ctn}>
                      <span className={`${stylesGeneral.body__text} `}>
                        Name :
                      </span>
                      <input
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={nameChangeHandler}
                      />
                    </span>
                    <span
                      className={`${styles.content_ctn} ${styles.margin_class}`}
                    >
                      <span className={`${stylesGeneral.body__text} `}>
                        Email :
                      </span>
                      <input
                        type="email"
                        className={styles.input}
                        style={{ marginLeft: "1.2rem" }}
                        value={userEmail}
                        onChange={emailChangeHandler}
                      />
                    </span>
                    <span className={styles.margin_class}>
                      <Button
                        btnSub={true}
                        onClick={(e) => {
                          e.preventDefault();
                          formSubmitHandler(userData.data[0]._id);
                        }}
                      >
                        Confirm
                      </Button>

                      {mutation.status === "pending" ? (
                        <span className={styles.spinner}>
                          <SpinnerMini />
                        </span>
                      ) : null}
                    </span>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UserCard;
