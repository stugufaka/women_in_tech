import React from "react";

// import img
import Image from "../assets/img/womenP.jpg";

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
                WIT
              </h2>
              <p className="mb-4 text-[#F61480]">What is WIT?</p>
              <hr className="mb-8 opacity-5" />
              <p className="mb-8">
                WIT stands for Women in Tech. It is a community or organization
                that focuses on promoting and supporting women's participation
                and advancement in the field of technology. WIT aims to create a
                more inclusive and diverse tech industry by providing resources,
                networking opportunities, mentorship programs, and advocacy for
                women in technology-related careers. The organization often
                organizes events, conferences, workshops, and initiatives to
                foster the growth, skills development, and empowerment of women
                in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
