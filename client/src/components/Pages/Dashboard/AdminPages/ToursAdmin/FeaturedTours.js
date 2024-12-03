import toast from "react-hot-toast";

import styles from "./FeaturedTours.module.css";
import stylesGeneral from "../../../../../styles/general.module.css";
import { Rating } from "react-simple-star-rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeatureTours } from "../../../../../features/adminApi/tourFeatures";

function FeaturedTours({ isFeatureToursLoading, tourFeatureData }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  const removeBtnClickHandler = (tourId) => {
    const flag = window.confirm(
      "Are you sure, you want to remove this tour from the feature list?"
    );

    if (!flag) return;

    mutation.mutate({ tourId, action: "remove", data: { feature: false } });
  };

  return (
    <div className={styles.featured_tour}>
      {!isFeatureToursLoading &&
        tourFeatureData.data.tours.map((tour) => (
          <div className={styles.section_body} key={tour._id}>
            <span
              className={styles.remove_icon_ctn}
              onClick={() => removeBtnClickHandler(tour._id)}
            >
              <ion-icon name="remove-circle"></ion-icon>
            </span>
            <div
              className={`${styles.body_header} ${stylesGeneral.section_border} `}
            >
              <p>{tour.name}</p>
              <div className={styles.rating_ctn}>
                <Rating
                  initialValue={tour.ratingsAverage}
                  allowFraction={true}
                  readonly={true}
                  size={16}
                ></Rating>
              </div>
            </div>

            <div className={styles.body_footer}>
              <aside>
                <span
                  className={`${styles.price_tag_secondary} ${stylesGeneral.body__text}`}
                >
                  from
                </span>
                <div className={styles.price_value}>
                  <span className={styles.price_value_sign}>&#x20B9;</span>
                  <span className={styles.price_value_number}>
                    {" "}
                    {tour.price}
                  </span>
                </div>
              </aside>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FeaturedTours;
