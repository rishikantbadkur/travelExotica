import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CHILD":
      return { ...state, children: state.children + 1 };
    case "REMOVE_CHILD":
      return { ...state, children: state.children - 1 };
    case "ADD_ADULT":
      return { ...state, adult: state.adult + 1 };
    case "REMOVE_ADULT":
      return { ...state, adult: state.adult - 1 };

    default:
      return state;
  }
};

const initialState = {
  adult: 1,
  children: 0,
};

const useBookingData = (tour) => {
  const [booking, dispatch] = useReducer(reducer, initialState);

  const decreaseAdultHandler = () => {
    if (booking.adult === 1) {
      return;
    }

    dispatch({ type: "REMOVE_ADULT" });
  };

  const addAdultHandler = () => {
    if (tour.maxGroupSize === booking.adult + booking.children) {
      return;
    }

    dispatch({ type: "ADD_ADULT" });
  };

  const decreaseChildHandler = () => {
    if (booking.children === 0) {
      return;
    }

    dispatch({ type: "REMOVE_CHILD" });
  };

  const addChildHandler = () => {
    if (tour.maxGroupSize === booking.adult + booking.children) {
      return;
    }

    dispatch({ type: "ADD_CHILD" });
  };

  return [
    booking,
    decreaseAdultHandler,
    addAdultHandler,
    decreaseChildHandler,
    addChildHandler,
  ];
};

export default useBookingData;
