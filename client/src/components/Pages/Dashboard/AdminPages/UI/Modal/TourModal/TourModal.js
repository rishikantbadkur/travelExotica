import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import toast from "react-hot-toast";

import styles from "./TourModal.module.css";
import stylesGeneral from "../../../../../../../styles/general.module.css";
import Button from "../../../../../../UI/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { getTour } from "../../../../../../../features/apiFearures/toursApiFeatures";
import SpinnerMedium from "../../../../../../UI/SpinnerMedium/SpinnerMedium";
import CitySearchInput from "../../CitySearchInput/CitySearchInput";

const TYPOLOGY_OPTIONS = [
  "Sports Activities",
  "Family-Friendly",
  "Heritage Tours",
  "Road Trips",
  "Budget Travel",
  "Culinary Tourism",
  "Eco-tourism",
  "Adventure Travel",
  "Beach Holidays",
  "Cultural Tours",
];

function TourModal({ tourId, setShowModal }) {
  const [search, setSearch] = useState(false);

  const [typologyOptions, setTypologyOptions] = useState([]);
  const [tourItinerary, setTourItinerary] = useState([]);
  const [tourLocations, setTourLocations] = useState([]);
  const [startDates, setStartDates] = useState([]);
  const [startLocation, setStartLocation] = useState();
  const [addNewPlan, setAddNewPlan] = useState(false);
  const [addNewLocation, setAddNewLocation] = useState(false);
  const [addNewDate, setAddNewDate] = useState(false);
  const [date, setDate] = useState();
  const [day, setDay] = useState();
  const [placeData, setPlaceData] = useState([]);
  const [highlight, setHighlight] = useState("");
  const [plan, setPlan] = useState("");

  const {
    data: tourData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTour(tourId),
    enabled: !!tourId,
  });

  function clickHandler(e) {
    setSearch(false);
  }

  useEffect(() => {
    if (!!tourData?.data.tour) {
      setTypologyOptions(tourData?.data?.tour.keywords);
      setTourItinerary(tourData?.data.tour.itinerary);
      setTourLocations(tourData?.data.tour.locations);
      setStartDates(tourData?.data.tour.startDates);
    }

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [
    tourData?.data.tour.keywords,
    tourData?.data.tour.itinerary,
    tourData?.data.tour,
  ]);

  console.log(tourData?.data.tour);
  // console.log(tourItinerary);

  const typologyChangeHandler = (e) => {
    if (typologyOptions.includes(e.target.value)) {
      const newOptions = typologyOptions.filter(
        (option) => option !== e.target.value
      );
      setTypologyOptions(newOptions);
      return;
    }

    setTypologyOptions((prev) => {
      return [...prev, e.target.value];
    });
  };

  const itineraryRemoveHandler = (day) => {
    const newItinerary = tourItinerary.filter((item) => item.day !== day);

    setTourItinerary(newItinerary);
  };

  const addNewDayPlanHandler = (e) => {
    e.preventDefault();
    if (highlight.trim().length === 0 || plan.trim().length === 0) {
      return toast.error("Please enter the day's highlight and plan");
    }

    setTourItinerary((prev) => {
      return [
        ...prev,
        {
          day: tourItinerary.length + 1,
          highlight,
          plan,
        },
      ];
    });
    setAddNewPlan(false);
    setHighlight("");
    setPlan("");
  };

  const addNewPlaceHandler = (cityData) => {
    // console.log(cityData);

    setPlaceData(cityData);
  };

  const addNewLocationHandler = (e) => {
    e.preventDefault();

    setTourLocations((prev) => {
      return [
        ...prev,
        {
          type: "point",
          day,
          coordinates: [placeData.lon, placeData.lat],
          description: placeData.name,
        },
      ];
    });

    setDay();
    setPlaceData([]);
    setAddNewLocation(false);
  };

  const locationRemoveHandler = (day) => {
    const updatedLocations = tourLocations.filter(
      (location) => location.day !== day
    );
    setTourLocations(updatedLocations);
  };

  const addNewDateHandler = (e) => {
    e.preventDefault();
    if (!date) {
      return toast.error("Please select a date");
    }

    setStartDates((prev) => {
      return [...prev, date];
    });
    setAddNewDate(false);
    setDate();
  };

  const dateRemoveHandler = (date) => {
    const updatedDates = startDates.filter(
      (d) =>
        new Date(d).toLocaleDateString() !== new Date(date).toLocaleDateString()
    );

    setStartDates(updatedDates);
  };

  const startLocationChangeHandler = (cityData) => {
    console.log({
      type: "Point",
      coordinates: [cityData.lon, cityData.lat],
      description: cityData.name,
    });

    setStartLocation({
      type: "Point",
      coordinates: [cityData.lon, cityData.lat],
      description: cityData.name,
    });
  };

  return (
    <ModalWrapper>
      {isLoading ? (
        <div className={styles.loading}>
          <SpinnerMedium />
        </div>
      ) : error ? (
        <div className={styles.loading}>
          <p>{error.message}</p>
        </div>
      ) : (
        <div className={styles.modal_ctn}>
          <div className={styles.close_ctn} onClick={() => setShowModal(false)}>
            <ion-icon name="close"></ion-icon>
          </div>
          <div className={styles.container}>
            <form
              className={styles.enquiry_form}
              // onSubmit={handleSubmit(formSubmitHandler)}
            >
              <div className={styles.form_field_ctn}>
                <label htmlFor="name" className={styles.text_main}>
                  Name :
                </label>
                <input
                  className={styles.enquiry_form_fields}
                  //   {...register("email")}
                  defaultValue={tourData.data.tour.name}
                  type="text"
                  id="name"
                  name="name"
                  required
                ></input>
              </div>

              <div className={styles.form_field_ctn}>
                <label htmlFor="date" className={styles.text_main}>
                  Date Created :
                </label>
                <p
                  className={styles.enquiry_form_fields}
                  //   {...register("email")}
                >
                  {new Date(tourData.data.tour.createdAt)
                    .toLocaleDateString()
                    .split("/")
                    .join("-")}
                </p>
              </div>

              <div className={styles.form_field_ctn}>
                <label htmlFor="price" className={styles.text_main}>
                  Price :
                </label>
                <input
                  className={styles.enquiry_form_fields}
                  //   {...register("email")}
                  defaultValue={tourData.data.tour.price}
                  type="number"
                  id="price"
                  name="price"
                  required
                  step={500}
                ></input>
              </div>

              <div className={styles.form_field_ctn}>
                <label htmlFor="size" className={styles.text_main}>
                  Group Size :
                </label>
                <input
                  className={styles.enquiry_form_fields}
                  //   {...register("email")}
                  defaultValue={tourData.data.tour.maxGroupSize}
                  type="number"
                  id="size"
                  name="size"
                  required
                  step={1}
                ></input>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="description" className={styles.text_main}>
                  Tour Dates :
                </label>

                <div className={styles.itinerary_ctn}>
                  {startDates.length === 0 ? (
                    <p className={stylesGeneral.body__text}>Add a Date</p>
                  ) : (
                    startDates.map((date, index) => (
                      <div className={styles.day_plan_ctn} key={date}>
                        {startDates.length === index + 1 && (
                          <span
                            className={styles.remove_icon}
                            onClick={() => dateRemoveHandler(date)}
                          >
                            <ion-icon name="remove-circle"></ion-icon>
                          </span>
                        )}
                        <p className={stylesGeneral.body__text}>
                          Date :{" "}
                          <span className={styles.color_black}>
                            {new Date(date)
                              .toLocaleDateString()
                              .split("/")
                              .join("-")}
                          </span>
                        </p>
                      </div>
                    ))
                  )}
                  {!addNewDate && (
                    <div className={styles.btn_planadd_ctn}>
                      <Button onClick={() => setAddNewDate(true)}>Add</Button>
                    </div>
                  )}
                  {addNewDate && (
                    <div className={styles.day_plan_ctn}>
                      <div className={styles.day_plan_add_ctn}>
                        <p
                          className={`${stylesGeneral.body__text} ${styles.color_black}`}
                        >
                          Date :{" "}
                        </p>
                        <input
                          className={styles.enquiry_form_fields}
                          onChange={(e) => setDate(e.target.value)}
                          type="date"
                          required
                          value={date}
                        />
                      </div>

                      <div className={styles.btn_dayplan_ctn}>
                        <Button onClick={addNewDateHandler}>Add</Button>
                        <Button
                          btnSub={true}
                          onClick={(e) => {
                            e.preventDefault();
                            setAddNewDate(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.form_field_ctn}>
                <label htmlFor="difficulty" className={styles.text_main}>
                  Difficulty :
                </label>

                <select
                  className={styles.enquiry_form_fields}
                  defaultValue={tourData.data.tour.difficulty}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficult">Difficult</option>
                </select>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="description" className={styles.text_main}>
                  Summary :
                </label>

                <textarea
                  className={styles.enquiry_form_fields}
                  defaultValue={tourData.data.tour.summary}
                  rows={3}
                ></textarea>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="description" className={styles.text_main}>
                  Description :
                </label>

                <textarea
                  className={styles.enquiry_form_fields}
                  defaultValue={tourData.data.tour.description}
                  rows={5}
                ></textarea>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="description" className={styles.text_main}>
                  Typologies :
                </label>
                <div className={styles.typology_ctn}>
                  {TYPOLOGY_OPTIONS.map((option, index) => (
                    <p className={styles.typology} key={index}>
                      <input
                        type="checkbox"
                        className={styles.typo_input}
                        value={option}
                        defaultChecked={tourData.data.tour.keywords.includes(
                          option
                        )}
                        onChange={typologyChangeHandler}
                      />{" "}
                      {option}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.form_field_ctn}>
                <label
                  htmlFor="startLocation"
                  className={`${styles.text_main} ${styles.city_input_text_align}`}
                >
                  Start Location :
                </label>

                <CitySearchInput
                  search={search}
                  setSearch={setSearch}
                  defaultCity={tourData.data.tour.startLocation.address}
                  setCityChange={startLocationChangeHandler}
                />
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="description" className={styles.text_main}>
                  Itinerary :
                </label>

                <div className={styles.itinerary_ctn}>
                  {tourItinerary.length === 0 ? (
                    <p className={stylesGeneral.body__text}>
                      Click on Add to create an itinerary
                    </p>
                  ) : (
                    tourItinerary.map((itinerary, index) => (
                      <div className={styles.day_plan_ctn} key={index}>
                        {tourItinerary.length === itinerary.day && (
                          <span
                            className={styles.remove_icon}
                            onClick={() =>
                              itineraryRemoveHandler(itinerary.day)
                            }
                          >
                            <ion-icon name="remove-circle"></ion-icon>
                          </span>
                        )}
                        <p className={stylesGeneral.body__text}>
                          <span className={styles.color_black}>
                            Day : {itinerary.day}
                          </span>
                        </p>
                        <p className={stylesGeneral.body__text}>
                          <span className={styles.color_black}>
                            Highlight :
                          </span>{" "}
                          {itinerary.highlight}
                        </p>
                        <p className={stylesGeneral.body__text}>
                          <span className={styles.color_black}>Plan :</span>{" "}
                          {itinerary.plan}
                        </p>
                      </div>
                    ))
                  )}
                  {!addNewPlan && (
                    <div className={styles.btn_planadd_ctn}>
                      <Button onClick={() => setAddNewPlan(true)}>Add</Button>
                    </div>
                  )}
                  {addNewPlan && (
                    <div className={styles.day_plan_ctn}>
                      <p className={stylesGeneral.body__text}>
                        <span className={styles.color_black}>
                          Day : {tourItinerary.length + 1}
                        </span>
                      </p>
                      <div className={styles.day_plan_add_ctn}>
                        <p
                          className={`${stylesGeneral.body__text} ${styles.color_black}`}
                        >
                          Highlight :{" "}
                        </p>
                        <input
                          className={styles.enquiry_form_fields}
                          placeholder="Highlights for the day"
                          onChange={(e) => setHighlight(e.target.value)}
                        />
                      </div>
                      <div className={styles.day_plan_add_ctn}>
                        <p
                          className={`${stylesGeneral.body__text} ${styles.color_black}`}
                        >
                          Plan :{" "}
                        </p>
                        <input
                          className={styles.enquiry_form_fields}
                          placeholder="Create a day's plan"
                          onChange={(e) => setPlan(e.target.value)}
                        />
                      </div>
                      <div className={styles.btn_dayplan_ctn}>
                        <Button onClick={addNewDayPlanHandler}>Create</Button>
                        <Button
                          btnSub={true}
                          onClick={(e) => {
                            e.preventDefault();
                            setAddNewPlan(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.form_field_ctn}>
                <label htmlFor="duration" className={styles.text_main}>
                  Duration :
                </label>
                <span className={stylesGeneral.body__text}>
                  {tourItinerary.length}
                  <span style={{ marginLeft: "1rem" }}>Days</span>
                </span>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="description" className={styles.text_main}>
                  Locations :
                </label>

                <div className={styles.itinerary_ctn}>
                  {tourLocations.length === 0 ? (
                    <p className={stylesGeneral.body__text}>
                      No Tour Locations present
                    </p>
                  ) : (
                    tourLocations.map((location, index) => (
                      <div
                        className={styles.day_plan_ctn}
                        key={location.description}
                      >
                        {tourLocations.length === index + 1 && (
                          <span
                            className={styles.remove_icon}
                            onClick={() => locationRemoveHandler(location.day)}
                          >
                            <ion-icon name="remove-circle"></ion-icon>
                          </span>
                        )}
                        <p className={stylesGeneral.body__text}>
                          <span className={styles.color_black}>
                            Day : {location.day}
                          </span>
                        </p>
                        <p className={stylesGeneral.body__text}>
                          <span className={styles.color_black}>Place :</span>{" "}
                          {location.description}
                        </p>
                      </div>
                    ))
                  )}
                  {!addNewLocation && (
                    <div className={styles.btn_planadd_ctn}>
                      <Button onClick={() => setAddNewLocation(true)}>
                        Add
                      </Button>
                    </div>
                  )}
                  {addNewLocation && (
                    <div className={styles.day_plan_ctn}>
                      <div className={styles.day_plan_add_ctn}>
                        <p
                          className={`${stylesGeneral.body__text} ${styles.color_black}`}
                        >
                          Day :{" "}
                        </p>
                        <input
                          className={styles.enquiry_form_fields}
                          placeholder="Enter a day"
                          onChange={(e) => setDay(e.target.value)}
                          type="number"
                          required
                          value={day}
                        />
                      </div>
                      <div className={styles.day_plan_add_ctn}>
                        <p
                          className={`${stylesGeneral.body__text} ${styles.color_black}`}
                        >
                          Place :{" "}
                        </p>

                        <CitySearchInput
                          setCityChange={addNewPlaceHandler}
                          search={search}
                          setSearch={setSearch}
                        />
                      </div>
                      <div className={styles.btn_dayplan_ctn}>
                        <Button onClick={addNewLocationHandler}>Create</Button>
                        <Button
                          btnSub={true}
                          onClick={(e) => {
                            e.preventDefault();
                            setAddNewLocation(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(typologyOptions);
                }}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
}

export default TourModal;
