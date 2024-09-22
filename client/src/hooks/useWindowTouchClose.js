import { useEffect, useRef } from "react";

const useWindowTouchClose = (toggleClose) => {
  const logoutRef = useRef(null);

  useEffect(() => {
    logoutRef.current = function closeModal(e) {
      if (
        e.target.name === "person-circle-outline" ||
        String(e.target.getAttribute("class")).split("_").includes("content")
      ) {
        return;
      }

      toggleClose();
    };
    document.addEventListener("click", logoutRef.current);

    return () => {
      document.removeEventListener("click", logoutRef.current);
    };
  }, [toggleClose]);
};

export default useWindowTouchClose;
