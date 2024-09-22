import ReactDOM from "react-dom";

import Button from "../Button/Button";
import styles from "./Modal.module.css";
import useWindowTouchClose from "../../../hooks/useWindowTouchClose";

const Modal = ({
  children,
  btnText,
  onTrue,
  isOpen,
  onClose,
  closeBtnText,
  paymentModel,
  modalType,
  logOutModal,
}) => {
  // useWindowTouchClose(onClose);
  if (!isOpen) {
    return null;
  }

  let modal;

  if (paymentModel) {
    if (modalType === "error") {
      modal = (
        <div className={styles.modal_content_payment}>
          <span className={`${styles.icon} ${styles.icon_error}`}>
            <ion-icon name="help-circle"></ion-icon>
          </span>
          <p className={styles.icon_error}>ERROR</p>
          <p className={styles.text_body}>{children}</p>
          <button
            onClick={onClose}
            className={`${styles.payMentModel_btn} ${styles.pay_error}`}
          >
            Continue
          </button>
        </div>
      );
    }

    if (modalType === "success") {
      modal = (
        <div className={styles.modal_content_payment}>
          <span className={`${styles.icon} ${styles.icon_success}`}>
            <ion-icon name="checkmark-circle"></ion-icon>
          </span>
          <p className={styles.icon_success}>SUCCESS</p>
          <p className={styles.text_body}>{children}</p>
          <button
            onClick={onClose}
            className={`${styles.payMentModel_btn} ${styles.pay_success}`}
          >
            Continue
          </button>
        </div>
      );
    }

    if (modalType === "booking error") {
      modal = (
        <div className={styles.modal_content_payment}>
          <span className={`${styles.icon} ${styles.icon_bookingerror}`}>
            <ion-icon name="alert-circle"></ion-icon>
          </span>
          <p className={styles.icon_bookingerror}>LOOK OUT</p>
          <p className={styles.text_body}>{children}</p>
          <button
            onClick={onClose}
            className={`${styles.payMentModel_btn} ${styles.pay_bookingerror}`}
          >
            Continue
          </button>
        </div>
      );
    }
  }

  if (logOutModal) {
    modal = (
      <div className={styles.modal_content}>
        <p style={{ fontSize: "1.8rem" }}>{children}</p>
        <aside className={styles.btn_ctn}>
          <span>
            <Button onClick={onTrue}>{btnText}</Button>
          </span>
          <span>
            <Button btnSub={true} onClick={onClose}>
              {closeBtnText || "CANCEL"}
            </Button>
          </span>
        </aside>
      </div>
    );
  }
  console.log(modal);

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>{modal}</div>,
    document.getElementById("portal")
  );
};

export default Modal;
