import React, { useState, useContext, useEffect } from "react";

// import data
// import { projectsData } from "../data";
import { projectsNav } from "../data";
import Data from "../data";
// import components
import Project from "./Project";
import { AuthContext } from "../utils/AuthProvider";

const Projects = () => {
  const [item, setItem] = useState({ name: "all" });
  const [projects, setProjects] = useState([]);
  const [projects_, setProjects_] = useState([]);
  const [active, setActive] = useState(0);

  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);

  async function getProjects() {
    const res = await contract?.getProject();
    setProjects(res);
  }
  useEffect(() => {
    getProjects();
  }, [contract, item]);

  useEffect(() => {
    // get projects based on item
    if (item.name === "all") {
      setProjects(projects);
    } else {
      const newProjects = projects.filter((project) => {
        // console.log(item.name);
        // console.log(project?.sdgCategory?.toLowerCase() === item.name);
        return project?.sdgCategory?.toLowerCase() === item.name;
      });
      console.log(newProjects);
      setProjects_(newProjects);
    }
  }, [item]);

  const handleClick = (e, index) => {
    // console.log(e.target.textContent.toLowerCase());
    setItem({ name: e.target.textContent.toLowerCase() });
    setActive(index);
  };

  return (
    <div>
      {/* projects nav */}
      <nav className="mb-12 max-w-xl mx-auto">
        <ul className="flex flex-col md:flex-row justify-evenly items-center text-[#F61480]">
          {projectsNav.map((item, index) => {
            return (
              <li
                onClick={(e) => {
                  handleClick(e, index);
                }}
                className={`${
                  active === index ? "active" : ""
                } cursor-pointer capitalize m-4`}
                key={index}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </nav>
      {/* projects */}
      <section className="grid gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
        {projects_?.map((item) => {
          return <Project item={item} key={item.id} />;
        })}
      </section>
    </div>
  );
};

export default Projects;
