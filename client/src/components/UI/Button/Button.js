import styles from "./Button.module.css";

const Button = ({
  children,
  btnSub,
  onClick,
  disabled,
  visibility,
  delType,
}) => {
  let btnClass = `${styles.btn_general} ${styles.btn_nav}`;

  if (btnSub) {
    btnClass = `${styles.btn_general} ${styles.btn_nav} ${styles.btn_sub}`;
  }

  if (delType) {
    btnClass = `${styles.btn_general} ${styles.btn_nav} ${styles.btn_delete}`;
  }

  return (
    <button
      style={{ visibility: visibility ? visibility : "visible" }}
      onClick={onClick}
      disabled={disabled}
      className={btnClass}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
