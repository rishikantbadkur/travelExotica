import { AnimatePresence, motion } from "framer-motion";

import styles from "./TourLanding.module.css";
import stylesGeneral from "../../../styles/general.module.css";
import useStaggerEffect from "../../../hooks/useStaggerEffect";

const IMAGES = [1, 2, 3, 3, 2, 1];

function TourGallery({ name, images }) {
  const [ref, inView, containerVariants, itemVariants] = useStaggerEffect();

  return (
    <div className={styles.tourLanding__body_gallery}>
      <div className={styles.tourLanding__body_text_main}>
        <h3 className={stylesGeneral.heading_quaternary}>Gallery</h3>
      </div>
      <div className={styles.tourLanding__body_text_sub}>
        <p className={stylesGeneral.body__text}>
          Each image tells a unique story, inviting us into a world of emotion,
          beauty, and complexity. Get ready to be moved, inspired, and
          challenged as we journey through this captivating collection of
          images. Join us and create yours now.
        </p>
      </div>
      <div ref={ref} className={styles.gallery_images_container}>
        <AnimatePresence>
          <motion.div
            className={styles.gallery_grid_container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {IMAGES.map((el, index) => (
              <motion.div
                className={styles.gallery_grid_image_container}
                key={index}
                variants={itemVariants}
              >
                <motion.img
                  className={styles.gallery_grid_image}
                  src={images[el]}
                  alt={name}
                  crossOrigin="anonymous"
                ></motion.img>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TourGallery;
