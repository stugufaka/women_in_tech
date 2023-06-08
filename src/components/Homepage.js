import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Brands from "./Brands";
import About from "./About";
import Portfolio from "./Portfolio";
import Skills from "./Skills";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import BackTopBtn from "./BackTopBtn";

const Homepage = () => {
  return (
    <div className="bg-white relative">
      <Header />
      <Hero />
      <Testimonials />
      <About />
      <Services />
      <Portfolio />
      <Footer />
      <BackTopBtn />
    </div>
  );
};

export default Homepage;
