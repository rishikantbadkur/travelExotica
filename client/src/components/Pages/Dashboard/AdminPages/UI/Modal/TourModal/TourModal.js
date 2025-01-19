import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import ModalWrapper from "../ModalWrapper";
import styles from "./TourModal.module.css";
import stylesGeneral from "../../../../../../../styles/general.module.css";
import Button from "../../../../../../UI/Button/Button";
import { getTour } from "../../../../../../../features/apiFearures/toursApiFeatures";
import SpinnerMedium from "../../../../../../UI/SpinnerMedium/SpinnerMedium";
import CitySearchInput from "../../CitySearchInput/CitySearchInput";
import {
  createTour,
  updateFeatureTours,
  updateTour,
  uploadTourImages,
} from "../../../../../../../features/adminApi/tourFeatures";
import SpinnerMini from "../../../../../../UI/SpinnerMini/SpinnerMini";
import TourDeleteModal from "../TourDeleteModal/TourDeleteModal";

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

function TourModal({ tourId, setShowModal, createModal }) {
  const [searchStartLocation, setSearchStarLocation] = useState(false);
  const [searchLocation, setSearchLocation] = useState(false);
  const [images, setImages] = useState([]);
  const [typologyOptions, setTypologyOptions] = useState([]);
  const [tourItinerary, setTourItinerary] = useState([]);
  const [tourLocations, setTourLocations] = useState([]);
  const [startDates, setStartDates] = useState([]);
  const [startLocation, setStartLocation] = useState({});
  const [addNewPlan, setAddNewPlan] = useState(false);
  const [addNewLocation, setAddNewLocation] = useState(false);
  const [addNewDate, setAddNewDate] = useState(false);
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [highlight, setHighlight] = useState("");
  const [plan, setPlan] = useState("");
  const [newTour, setNewTour] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const {
    data: tourData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTour(tourId),
    enabled: !!tourId,
  });

  const queryClient = useQueryClient();

  const featureToursMutation = useMutation({
    mutationFn: updateFeatureTours,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Success");
        queryClient.invalidateQueries("toursFeature");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const tourUpdateMutation = useMutation({
    mutationFn: updateTour,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Tour updated successfully");
        setShowModal(false);
        queryClient.invalidateQueries(["tour", tourId]);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const tourCreateMutation = useMutation({
    mutationFn: createTour,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Tour created successfully");
        setShowModal(false);
        queryClient.invalidateQueries(["tours"]);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const imageUploadMutation = useMutation({
    mutationFn: uploadTourImages,
    onSuccess: (res) => {
      if (res.status === "success") {
        setNewTour((prev) => {
          return {
            ...prev,
            galleryImages: res.images,
          };
        });
        toast.success(res.message);
      }
    },
    onError: (error) => {
      toast.error("Something went wrong while uploading tour images.");
    },
  });

  function clickHandler(e) {
    setSearchLocation(false);
    setSearchStarLocation(false);
  }

  useEffect(() => {
    if (!!tourData?.data.tour) {
      setTypologyOptions(tourData?.data?.tour.keywords);
      setTourItinerary(tourData?.data.tour.itinerary);
      setTourLocations(tourData?.data.tour.locations);
      setStartDates(tourData?.data.tour.startDates);
      setStartLocation(tourData?.data.tour.startLocation);
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
    setPlaceData(cityData);
  };

  const addNewLocationHandler = (e) => {
    e.preventDefault();

    setTourLocations((prev) => {
      return [
        ...prev,
        {
          type: "Point",
          day: Number(day),
          coordinates: [placeData.lon, placeData.lat],
          description: placeData.name,
        },
      ];
    });

    setDay("");
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
      return [...prev, new Date(date).toISOString()];
    });
    setAddNewDate(false);
    setDate("");
  };

  const dateRemoveHandler = (date) => {
    const updatedDates = startDates.filter(
      (d) =>
        new Date(d).toLocaleDateString() !== new Date(date).toLocaleDateString()
    );

    setStartDates(updatedDates);
  };

  const startLocationChangeHandler = (cityData) => {
    setStartLocation({
      type: "Point",
      coordinates: [cityData.lon, cityData.lat],
      description: cityData.name,
      address: cityData.name,
    });
  };

  const featureTourUpdateHandler = (tourId) => {
    featureToursMutation.mutate({
      tourId,
      data: { feature: true },
      action: "add",
    });
  };

  const updateFormSubmitHandler = (data, tourId) => {
    const flag = window.confirm(
      "Are you sure you want to update the tour details?"
    );

    if (!flag) return;

    tourUpdateMutation.mutate({
      tourId,
      data: {
        ...data,
        summary: data.summary.trim(),
        description: data.description.trim(),
        price: Number(data.price),
        maxGroupSize: Number(data.maxGroupSize),
        duration: tourItinerary.length,
        keywords: typologyOptions,
        locations: tourLocations,
        startDates,
        startLocation,
        itinerary: tourItinerary,
      },
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    const selectedFiles = Array.from(e.target.files);

    const updatedImages = [...images, ...selectedFiles];

    if (updatedImages.length > 4) {
      alert("You can only upload uoto 4 images");
      setImages(updatedImages.slice(0, 4));
      return;
    }

    setImages(updatedImages);
  };

  const imageUploadHandler = (data) => {
    console.log(data);
    if (images.length !== 4) {
      return toast.error("Exactly 4 images are required");
    }

    const updatedTourName = data.name
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    const formData = new FormData();
    formData.append("tourName", updatedTourName.split(" ").join(""));

    images.forEach((image) => {
      formData.append("images", image);
    });

    imageUploadMutation.mutate(formData);
  };

  const createFormSubmitHandler = (data) => {
    if (
      data.name.trim().length === 0 ||
      data.description.trim().length === 0 ||
      data.summary.trim().length === 0 ||
      tourItinerary.length === 0 ||
      typologyOptions.length === 0 ||
      tourLocations.length === 0 ||
      startDates.length === 0 ||
      !startLocation
    ) {
      return toast.error("All tour fields are required");
    }

    const updatedTourName = data.name
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    tourCreateMutation.mutate({
      ...data,
      ...newTour,
      name: updatedTourName,
      summary: data.summary.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      maxGroupSize: Number(data.maxGroupSize),
      duration: tourItinerary.length,
      keywords: typologyOptions,
      locations: tourLocations,
      startDates,
      startLocation,
      itinerary: tourItinerary,
      feature: false,
    });
  };

  return (
    <ModalWrapper>
      {showDeleteModal && (
        <TourDeleteModal
          setShowDeleteModal={setShowDeleteModal}
          tourName={tourData?.data.tour.name}
          tourId={tourId}
          setShowModal={setShowModal}
        />
      )}
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
            {!createModal && (
              <div className={styles.featured_ctn}>
                {!tourData?.data.tour.feature ? (
                  <button
                    className={styles.feature_btn}
                    onClick={() => featureTourUpdateHandler(tourId)}
                  >
                    Set as Featured
                  </button>
                ) : (
                  <span className={styles.featured}>Featured</span>
                )}
                {featureToursMutation.status === "pending" ? (
                  <span className={styles.spinner_ctn}>
                    <SpinnerMini />
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
            <form className={styles.enquiry_form}>
              <div className={styles.form_field_ctn}>
                <label htmlFor="name" className={styles.text_main}>
                  Name :
                </label>
                <input
                  className={styles.enquiry_form_fields}
                  {...register("name")}
                  defaultValue={tourData ? tourData.data.tour.name : ""}
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
                <p className={styles.enquiry_form_fields}>
                  {tourData
                    ? new Date(tourData.data.tour.createdAt)
                        .toLocaleDateString()
                        .split("/")
                        .join("-")
                    : new Date(Date.now())
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
                  {...register("price")}
                  defaultValue={tourData ? tourData.data.tour.price : ""}
                  type="number"
                  id="price"
                  name="price"
                  required
                  step={500}
                ></input>
              </div>

              <div className={styles.form_field_ctn}>
                <label htmlFor="maxGroupSize" className={styles.text_main}>
                  Group Size :
                </label>
                <input
                  className={styles.enquiry_form_fields}
                  {...register("maxGroupSize")}
                  defaultValue={tourData ? tourData.data.tour.maxGroupSize : ""}
                  type="number"
                  id="maxGroupSize"
                  name="maxGroupSize"
                  required
                  step={1}
                ></input>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="tourDates" className={styles.text_main}>
                  Tour Dates :
                </label>

                <div className={styles.itinerary_ctn}>
                  {startDates.length === 0 ? (
                    <p className={stylesGeneral.body__text}>Add a Date</p>
                  ) : (
                    startDates.map((date, index) => (
                      <div className={styles.day_plan_ctn} key={date}>
                        {index === 0 && (
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
                  defaultValue={
                    tourData ? tourData.data.tour.difficulty : "Easy"
                  }
                  {...register("difficulty")}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficult">Difficult</option>
                </select>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="summary" className={styles.text_main}>
                  Summary :
                </label>

                <textarea
                  {...register("summary")}
                  className={styles.enquiry_form_fields}
                  defaultValue={tourData ? tourData.data.tour.summary : ""}
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
                  {...register("description")}
                  className={styles.enquiry_form_fields}
                  defaultValue={tourData ? tourData.data.tour.description : ""}
                  rows={5}
                ></textarea>
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="typologies" className={styles.text_main}>
                  Typologies :
                </label>
                <div className={styles.typology_ctn}>
                  {TYPOLOGY_OPTIONS.map((option, index) => (
                    <p className={styles.typology} key={index}>
                      <input
                        type="checkbox"
                        className={styles.typo_input}
                        value={option}
                        defaultChecked={tourData?.data.tour.keywords.includes(
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
                  key="first-city-search"
                  search={searchStartLocation}
                  setSearch={setSearchStarLocation}
                  defaultCity={
                    tourData ? tourData.data.tour.startLocation.address : ""
                  }
                  setCityChange={startLocationChangeHandler}
                />
              </div>

              <div
                className={`${styles.form_field_ctn} ${styles.textarea_field}`}
              >
                <label htmlFor="itinerary" className={styles.text_main}>
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
                <label htmlFor="locations" className={styles.text_main}>
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
                          key="second-city-search"
                          setCityChange={addNewPlaceHandler}
                          search={searchLocation}
                          setSearch={setSearchLocation}
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

              {createModal && (
                <div
                  className={`${styles.form_field_ctn} ${styles.textarea_field}`}
                >
                  <label htmlFor="image" className={styles.text_main}>
                    Image :
                  </label>
                  <div className={styles.img_select_ctn}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                    ></input>
                    <ul className={styles.selected_img_list}>
                      {images.map((image, index) => (
                        <li key={index}>{image.name}</li>
                      ))}
                      {images.length > 0 && (
                        <li
                          className={styles.remove_img_btn}
                          onClick={() => {
                            setImages(
                              images.filter(
                                (image, index) => index !== images.length - 1
                              )
                            );
                          }}
                        >
                          Remove
                        </li>
                      )}
                    </ul>
                    <p
                      style={{
                        marginTop: "1rem",
                        color: "#000",
                        fontSize: "1.1rem",
                      }}
                    >
                      Last image will be used as the cover image for the tour.
                    </p>
                    <div>
                      <button
                        className={styles.img_upload_btn}
                        onClick={handleSubmit(imageUploadHandler)}
                      >
                        Upload Images
                      </button>
                      <span className={styles.img_upload_text}>
                        {imageUploadMutation.status === "pending"
                          ? "Uploading..."
                          : imageUploadMutation.status === "success"
                          ? "Upload Successful"
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {createModal ? (
                <Button onClick={handleSubmit(createFormSubmitHandler)}>
                  {tourCreateMutation.status === "pending" ? (
                    <SpinnerMini />
                  ) : (
                    "Create"
                  )}
                </Button>
              ) : (
                <div className={styles.action_btn_ctn}>
                  <Button
                    onClick={handleSubmit((data) =>
                      updateFormSubmitHandler(data, tourId)
                    )}
                  >
                    {tourUpdateMutation.status === "pending" ? (
                      <SpinnerMini />
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button
                    btnSub={true}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
}

export default TourModal;
