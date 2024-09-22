import styles from "./Contacts.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import ContactForm from "../../helpers/ContactForm/ContactForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useWindowScroll from "../../../hooks/useWindowScroll";
import useTitle from "../../../hooks/useTitle";

const Contacts = () => {
  useWindowScroll();
  useTitle("Contact us");

  return (
    <>
      <Header />
      <section>
        <div className={styles.img_container}>
          <h1 className={styles.text_main}>Contact Us</h1>
        </div>
        <div className={styles.container_wrapper}>
          <div className={styles.location}>
            <div className={`${styles.icon_wrapper} ${styles.color_grey}`}>
              <div className={styles.icon_location}>
                <ion-icon name="location-sharp"></ion-icon>
              </div>
            </div>

            <div className={styles.heading_text}>
              <span
                className={`${stylesGeneral.body__text} ${styles.font_black}`}
              >
                Travel Agency
              </span>
            </div>
            <div className={styles.body_text}>
              <p
                className={`${stylesGeneral.body__text} ${styles.body_text_length}`}
              >
                101 Raveline Street, 3rd exit, Parker Bridge, Indore, MP, India
              </p>
            </div>
            <div className={styles.heading_text}>
              <span
                className={`${stylesGeneral.body__text} ${styles.font_black}`}
              >
                Travel Operator
              </span>
            </div>
            <div className={styles.body_text}>
              <p
                className={`${stylesGeneral.body__text} ${styles.body_text_length}`}
              >
                MR 10 Square, Super Corridor, Indore
              </p>
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={`${styles.icon_wrapper} ${styles.color_green}`}>
              <div className={styles.icon_contact}>
                <ion-icon name="call"></ion-icon>
              </div>
            </div>

            <div className={styles.heading_text}>
              <span
                className={`${stylesGeneral.body__text} ${styles.font_black}`}
              >
                Mobile Number
              </span>
            </div>
            <div className={styles.body_text}>
              <p
                className={`${stylesGeneral.body__text} ${styles.body_text_length}`}
              >
                Rishikant Badkur "Tour Consultant" : +91 8770563411
              </p>
            </div>
            <div className={styles.heading_text}>
              <span
                className={`${stylesGeneral.body__text} ${styles.font_black}`}
              >
                Office Number
              </span>
            </div>
            <div className={styles.body_text}>
              <p
                className={`${stylesGeneral.body__text} ${styles.body_text_length}`}
              >
                Administration : +91 7400792226 Technical Office: 18002222222
              </p>
            </div>
          </div>
          <div className={styles.message}>
            <div className={`${styles.icon_wrapper} ${styles.color_black}`}>
              <div className={styles.icon_message}>
                <ion-icon name="mail"></ion-icon>
              </div>
            </div>

            <div className={styles.heading_text}>
              <span
                className={`${stylesGeneral.body__text} ${styles.font_black}`}
              >
                Quotes
              </span>
            </div>
            <div className={styles.body_text}>
              <p
                className={`${stylesGeneral.body__text} ${styles.body_text_length}`}
              >
                Write to this email for a detailed quotation and information at
                <span className={styles.text_underline}>
                  quote@travelExotica.com
                </span>
              </p>
            </div>
            <div className={styles.heading_text}>
              <span
                className={`${stylesGeneral.body__text} ${styles.font_black}`}
              >
                Consulting
              </span>
            </div>
            <div className={styles.body_text}>
              <p
                className={`${stylesGeneral.body__text} ${styles.body_text_length}`}
              >
                Our free consultation service can be requested here
                <span className={styles.text_underline}>
                  info@travelExotica.com
                </span>{" "}
                every day.
              </p>
            </div>
          </div>
        </div>

        <ContactForm></ContactForm>
      </section>
      <Footer />
    </>
  );
};

export default Contacts;
