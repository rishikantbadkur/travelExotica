import Hero from "../Hero/Hero";
import ServicesHome from "../ServicesHome/ServicesHome";
import Tours from "../Tours/Tours";
import ReviewsHome from "../ReviewsHome/ReviewsHome";
import ContactHome from "../ContactHome/ContactHome";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useWindowScroll from "../../../hooks/useWindowScroll";

function HomePage() {
  useWindowScroll();
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Tours></Tours>
      <ServicesHome></ServicesHome>
      <ReviewsHome></ReviewsHome>
      <ContactHome></ContactHome>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
