import { useEffect, useRef, useState } from "react";
import usePackageReducer from "./usePackageReducer";
import { getAllTours } from "../../../features/apiFearures/toursApiFeatures";
import { useQuery } from "@tanstack/react-query";

function resolveFilter(
  tours,
  destination,
  typologies,
  price,
  duration,
  difficulty,
  sortby
) {
  let queryTours = [...tours];

  if (destination && destination !== "All Destinations") {
    queryTours = queryTours.filter((tour) => {
      const queryLocations = tour.locations.map(
        (location) => location.description
      );
      return queryLocations.includes(destination);
    });
  }

  if (typologies) {
    queryTours = queryTours.filter((tour) => {
      return typologies.every((keyword) => tour.keywords.includes(keyword));
    });
  }

  if (price) {
    queryTours = queryTours.filter((tour) => tour.price <= price);
  }

  if (difficulty.length > 0) {
    queryTours = queryTours.filter((tour) =>
      difficulty.includes(tour.difficulty)
    );
  }

  if (duration) {
    switch (duration) {
      case "< 8 days":
        queryTours = queryTours.filter((tour) => tour.duration < 8);
        break;
      case "< 11 days":
        queryTours = queryTours.filter((tour) => tour.duration < 11);
        break;
      case "> 11 days":
        queryTours = queryTours.filter((tour) => tour.duration >= 11);
        break;
      case "all":
        break;
      default:
        break;
    }
  }

  if (sortby) {
    if (sortby === "Price") {
      queryTours.sort((tour1, tour2) => tour1.price - tour2.price);
    }

    if (sortby === "Duration") {
      queryTours.sort((tour1, tour2) => tour1.duration - tour2.duration);
    }
  }

  return queryTours;
}

function useTourFilter() {
  const {
    data: tourData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(false),
  });

  const [filteredTours, setFilteredTours] = useState(null);
  const [tourNillFlag, setTourNillFlag] = useState(false);
  const tourSuggested = useRef(null);

  const [
    filteredOptions,
    handleDifficultyChange,
    handlePriceChange,
    handleDurationChange,
    handleTypologiesChange,
    handleDestinationChange,
    handleSortByChange,
    pageCount,
    setPageCount,
  ] = usePackageReducer();

  useEffect(() => {
    if (tourData?.data.tours) {
      if (
        !filteredOptions.destination &&
        !filteredOptions.typologies &&
        !filteredOptions.price &&
        !filteredOptions.difficulty &&
        !filteredOptions.duration &&
        !filteredOptions.sortby
      ) {
        setFilteredTours(null);
        return;
      }

      const tours = tourData.data.tours;

      const queryTours = resolveFilter(
        tours,
        filteredOptions.destination,
        filteredOptions.typologies,
        filteredOptions.price,
        filteredOptions.duration,
        filteredOptions.difficulty,
        filteredOptions.sortby
      );

      if (queryTours.length >= 1) {
        tourSuggested.current = queryTours;

        setTourNillFlag(false);
        setFilteredTours(queryTours);
      } else {
        setTourNillFlag(true);
        setFilteredTours(tourSuggested.current);
      }
    }
  }, [
    filteredOptions.destination,
    tourData?.data.tours,
    filteredOptions.typologies,
    filteredOptions.price,
    filteredOptions.duration,
    filteredOptions.difficulty,
    filteredOptions.sortby,
  ]);

  return [
    filteredOptions,
    tourNillFlag,
    tourData,
    error,
    isError,
    filteredTours,
    isLoading,
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

export default useTourFilter;
