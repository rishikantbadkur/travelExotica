import styles from "./TourFilterForm.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import CheckBoxInput from "../../UI/CheckBoxInput/CheckBoxInput";

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

const DURATION_OPTIONS = ["< 8 days", "< 11 days", "> 11 days", "All"];

const DIFFICULTY_OPTIONS = ["Difficult", "Medium", "Easy"];

const DESTINATIONS = [
  "All Destinations",
  "Manali",
  "Goa",
  "Srinagar",
  "Leh",
  "Lakshadweep",
  "Udaipur",
  "Kodaikanal",
  "Darjeeling",
];

function TourFilterForm({
  price,
  onDestinationChange,
  onPriceChange,
  onDurationChange,
  onTypologiesChange,
  onDifficultyChange,
  onSortByChange,
}) {
  return (
    <div className={styles.select_options_wrapper}>
      <div className={styles.options_container}>
        <div
          className={`${styles.option_destination} ${stylesGeneral.section_border}`}
        >
          <h4 className={`${styles.option_title} ${stylesGeneral.body__text}`}>
            Search By Destination :
          </h4>
          <div className={styles.option_body_destination}>
            <label htmlFor="destination"></label>

            <select
              className={styles.select_option_styles}
              name="destination"
              id="destination"
              onChange={onDestinationChange}
            >
              {DESTINATIONS.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className={`${styles.option_destination} ${stylesGeneral.section_border}`}
        >
          <h4 className={`${styles.option_title} ${stylesGeneral.body__text}`}>
            Sort By :
          </h4>
          <div className={styles.option_body_destination}>
            <label htmlFor="sortby"></label>

            <select
              className={styles.select_option_styles}
              name="sortby"
              id="sortby"
              onChange={onSortByChange}
            >
              <option value="None">None</option>
              <option value="Price">Price</option>
              <option value="Duration">Duration</option>
            </select>
          </div>
        </div>

        <div
          className={`${styles.option_typology} ${stylesGeneral.section_border}`}
        >
          <h4 className={`${styles.option_title} ${stylesGeneral.body__text}`}>
            Typologies :
          </h4>
          <div className={styles.option_body}>
            {TYPOLOGY_OPTIONS.map((el) => (
              <p
                key={el}
                className={`${styles.option_body_item} ${stylesGeneral.body__text}`}
              >
                <CheckBoxInput
                  name={el}
                  value={el}
                  onChange={onTypologiesChange}
                />
                {el}
              </p>
            ))}
          </div>
        </div>
        <div
          className={`${styles.option_price} ${stylesGeneral.section_border}`}
        >
          <h4 className={`${styles.option_title} ${stylesGeneral.body__text}`}>
            Max Price :
          </h4>
          <div className={styles.option_body_price}>
            <aside className={styles.price_box}>
              <span className={styles.price_value_sign}>&#x20B9;</span>
              <span className={` ${stylesGeneral.body__text}`}>
                {price ? price : 30000}
              </span>
            </aside>
            <label htmlFor="price"></label>
            <input
              onChange={onPriceChange}
              className={styles.price_bar}
              type="range"
              name="price"
              id="price"
              min={15000}
              max={30000}
              defaultValue={30000}
              step={1000}
            ></input>
          </div>
        </div>
        <div
          className={`${styles.option_duration} ${stylesGeneral.section_border}`}
        >
          <h4 className={`${styles.option_title} ${stylesGeneral.body__text}`}>
            Duration :
          </h4>
          <div className={styles.option_body}>
            {DURATION_OPTIONS.map((el) => (
              <p
                key={el}
                className={`${styles.option_body_item} ${stylesGeneral.body__text}`}
              >
                <input
                  type="radio"
                  name="duration"
                  value={el}
                  onChange={onDurationChange}
                />
                {el}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.option_difficulty}>
          <h4 className={`${styles.option_title} ${stylesGeneral.body__text}`}>
            Difficulty :
          </h4>
          <div className={styles.option_body}>
            {DIFFICULTY_OPTIONS.map((el) => (
              <p
                key={el}
                className={`${styles.option_body_item} ${stylesGeneral.body__text}`}
              >
                <CheckBoxInput
                  name={el}
                  value={el}
                  onChange={onDifficultyChange}
                />
                {el}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourFilterForm;
