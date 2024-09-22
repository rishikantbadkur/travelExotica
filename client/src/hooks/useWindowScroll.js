import { useEffect } from "react";

function useWindowScroll() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useWindowScroll;
