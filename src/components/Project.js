import React from "react";
import { Link } from "react-router-dom";
import { truncateString } from "../lib/utilities";

const Project = ({ item }) => {
  return (
    <Link to={`/project/${item?.projectId?.toString()}`}>
      <div
        key={item?.id?.toString()}
        className="flex ring-1 ring-white rounded-2xl flex-col items-center text-center"
      >
        <div className="mb-8">
          <img className="rounded-2xl" src={item?.cover} alt="" />
        </div>
        <p className="capitalize text-accent text-sm mb-3">
          {truncateString(item?.sdgCategory, 60)}
        </p>
        <h3 className="text-white text-2xl font-semibold capitalize mb-3">
          {item?.title}
        </h3>
        <p className=" text-white text-base max-w-md">@{item?.explorerName}</p>
        <p className="text-white pb-3 text-base max-w-md">
          {truncateString(item?.description, 60)}
        </p>
      </div>
    </Link>
  );
};

export default Project;
