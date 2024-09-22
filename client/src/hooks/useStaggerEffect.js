import { useInView } from "react-intersection-observer";

function useStaggerEffect() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return [ref, inView, containerVariants, itemVariants];
}

export default useStaggerEffect;
