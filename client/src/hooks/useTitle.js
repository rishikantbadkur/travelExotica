import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    if (title) {
      window.document.title = `travelExotica  |  ${title}`;
    }
    return () => {
      document.title = "travelExotica";
    };
  });
}

export default useTitle;
