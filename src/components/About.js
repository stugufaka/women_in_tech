import React from "react";

// import img
import Image from "../assets/img/about.jpg";

const About = () => {
  return (
    <section className="section bg-secondary" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-24">
          <img
            className="object-cover h-full w-[566px] md:mx-auto lg:mx-0 rounded-2xl"
            src={Image}
            alt=""
          />
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col">
              <h2 className="text-3xl lg:text-4xl font-medium lg:font-extrabold mb-3 before:content-about relative before:absolute before:opacity-40 before:-top-[2rem] before:hidden before:lg:block">
                world3
              </h2>
              <p className="mb-4 text-accent">What is World3?</p>
              <hr className="mb-8 opacity-5" />
              <p className="mb-8">
                World 3 is a web 3.0 platform that will bring together explorers
                to solve social and environmental problems of the SDG goals. Our
                mission is to use blockchain to achieve real world impact,
                especially in areas where there is no other solution. We believe
                that the technology exists today, and more importantly, we have
                built World3 to be easily adopted by anyone that needs a tool
                for managing social issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
