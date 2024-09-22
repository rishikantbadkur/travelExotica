import stylesGeneral from "../../../styles/general.module.css";
import styles from "./Checklist.module.css";

const CHECKLIST_ITEMS = [
  { included: "yes", facility: "Train tickets and Bus transportation" },
  { included: "yes", facility: "Breakfast, lunch, and dinner" },
  { included: "yes", facility: "Accommodation at hotel" },
  { included: "yes", facility: "Professional tour guide" },
  { included: "yes", facility: "Transfers between destinations" },
  { included: "no", facility: "Entrance fees to museums" },
  { included: "no", facility: "Sports/Water or any other activities" },
  { included: "no", facility: "Entry fees to protected areas" },
];

const Checklist = () => {
  return (
    <>
      {CHECKLIST_ITEMS.map((item, index) => (
        <li className={styles.featureList_item} key={index}>
          <div className={styles.checkmark}>
            {item.included === "yes" ? (
              <ion-icon name="checkmark-sharp"></ion-icon>
            ) : (
              <span style={{ color: "red" }}>
                <ion-icon name="close-outline"></ion-icon>
              </span>
            )}
          </div>

          <p className={stylesGeneral.body__text}>{item.facility}</p>
        </li>
      ))}
    </>
  );
};

export default Checklist;
