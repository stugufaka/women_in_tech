import React from "react";
import { Link } from "react-router-dom";

// import components
import Projects from "./Projects";

const Portfolio = () => {
  return (
    <section id="explorers" className="section bg-primary min-h-[1400px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <button className="btn btn-md bg-green-600 mb-4 rounded-2xl  md:btn-lg transition-all">
            <Link to="/explorers">
              {" "}
              <span className="text-white">View Explorers</span>
            </Link>
          </button>
          <h2 className="section-title relative before:absolute before:opacity-40 before:-top-[2rem] before:-left-3/4 before:hidden before:lg:block">
            Projects{" "}
          </h2>
          <p className="subtitle">
            Explorers are people who need funds to work on the SDG goals
          </p>
        </div>
        <Projects />
      </div>
    </section>
  );
};

export default Portfolio;
