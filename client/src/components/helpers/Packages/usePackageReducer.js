import { useReducer, useState } from "react";

const INITIAL_STATE = {
  destination: null,
  typologies: [],
  price: null,
  duration: null,
  difficulty: [],
  sortby: null,
};

const multipleSelectCheckAdd = (state, action, parameter) => {
  if (parameter === "typologies") {
    return { ...state, typologies: [...state.typologies, action.payload] };
  } else {
    return { ...state, difficulty: [...state.difficulty, action.payload] };
  }
};

const multipleSelectCheckRemove = (state, action, parameter) => {
  if (parameter === "typologies") {
    return {
      ...state,
      typologies: state.typologies.filter((el) => el !== action.payload),
    };
  } else {
    return {
      ...state,
      difficulty: state.difficulty.filter((el) => el !== action.payload),
    };
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DESTINATION":
      return { ...state, destination: action.payload };
    case "TYPOLOGY/ADD":
      return multipleSelectCheckAdd(state, action, "typologies");
    case "TYPOLOGY/REMOVE":
      return multipleSelectCheckRemove(state, action, "typologies");
    case "PRICE":
      return { ...state, price: action.payload };
    case "DURATION":
      return { ...state, duration: action.payload };
    case "DIFFICULTY/ADD":
      return multipleSelectCheckAdd(state, action, "difficulty");

    case "DIFFICULTY/REMOVE":
      return multipleSelectCheckRemove(state, action, "difficulty");
    case "SORTBY":
      return { ...state, sortby: action.payload };
    default:
      return state;
  }
};

function usePackageReducer() {
  const [filteredOptions, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [pageCount, setPageCount] = useState(1);

  function handleDifficultyChange(e) {
    setPageCount(1);
    if (filteredOptions.difficulty.includes(e.target.value)) {
      dispatch({ type: "DIFFICULTY/REMOVE", payload: e.target.value });
    } else {
      dispatch({ type: "DIFFICULTY/ADD", payload: e.target.value });
    }
  }

  function handlePriceChange(e) {
    setPageCount(1);
    return dispatch({ type: "PRICE", payload: e.target.value });
  }

  function handleDurationChange(e) {
    setPageCount(1);
    return dispatch({ type: "DURATION", payload: e.target.value });
  }

  function handleTypologiesChange(e) {
    setPageCount(1);
    if (filteredOptions.typologies.includes(e.target.value)) {
      dispatch({ type: "TYPOLOGY/REMOVE", payload: e.target.value });
    } else {
      dispatch({ type: "TYPOLOGY/ADD", payload: e.target.value });
    }
  }

  function handleDestinationChange(e) {
    setPageCount(1);
    dispatch({ type: "DESTINATION", payload: e.target.value });
  }

  function handleSortByChange(e) {
    setPageCount(1);
    dispatch({ type: "SORTBY", payload: e.target.value });
  }

  return [
    filteredOptions,
    handleDifficultyChange,
    handlePriceChange,
    handleDurationChange,
    handleTypologiesChange,
    handleDestinationChange,
    handleSortByChange,
    pageCount,
    setPageCount,
  ];
}

export default usePackageReducer;
