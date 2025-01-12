import styles from "./TourDeleteModal.module.css";
import stylesGeneral from "../../../../../../../styles/general.module.css";
import ModalWrapper from "../ModalWrapper";
import Button from "../../../../../../UI/Button/Button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTour } from "../../../../../../../features/adminApi/tourFeatures";
import toast from "react-hot-toast";

function TourDeleteModal({
  setShowDeleteModal,
  tourName,
  tourId,
  setShowModal,
}) {
  const [correct, setCorrect] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Tour deleted successfully");
        setShowDeleteModal(false);
        setShowModal(false);
        queryClient.invalidateQueries("tours");
      }
    },
    onError: (error) => {
      toast.error("Error deleting tour");
      setShowDeleteModal(false);
    },
  });

  let inputClass =
    inputValue.length === 0
      ? `${styles.input}`
      : correct
      ? `${styles.input} ${styles.correct}`
      : `${styles.input} ${styles.false}`;

  const tourNameChangeHandler = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === tourName) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  const tourDeleteHandler = () => {
    mutation.mutate(tourId);
  };

  return (
    <div style={{ zIndex: 999 }}>
      <ModalWrapper>
        <div className={styles.ctn}>
          <h2 className={stylesGeneral.heading_quaternary}>
            Please enter the tour name to continue.
          </h2>
          <input
            className={inputClass}
            onChange={tourNameChangeHandler}
            value={inputValue}
          ></input>
          <div className={styles.btn_ctn}>
            <Button disabled={!correct} onClick={tourDeleteHandler}>
              {mutation.status === "pending" ? "Deleting" : "Confirm"}
            </Button>
            <Button btnSub={true} onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default TourDeleteModal;
