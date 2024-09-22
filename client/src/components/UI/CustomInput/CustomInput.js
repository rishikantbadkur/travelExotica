import { forwardRef } from "react";
import styles from "./CustomInput.module.css";

const CustomInput = forwardRef(
  ({ placeholder, type, id, name, onChange, onKeyDown }, ref) => {
    return (
      <input
        {...ref}
        className={styles.enquiry_form_fields}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        required
        onKeyDown={onKeyDown}
      ></input>
    );
  }
);

export default CustomInput;
