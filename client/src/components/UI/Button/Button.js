import styles from "./Button.module.css";

const Button = ({ children, btnSub, onClick, disabled, visibility, type }) => {
  return (
    <button
      style={{ visibility: visibility ? visibility : "visible" }}
      onClick={onClick}
      disabled={disabled}
      className={
        btnSub
          ? `${styles.btn_general} ${styles.btn_nav} ${styles.btn_sub}`
          : `${styles.btn_general} ${styles.btn_nav}`
      }
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
