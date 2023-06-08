import React, { useState, useEffect, useContext } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Image from "../assets/img/about.webp";
import AlbumCover1 from "../assets/img/nature.jpeg";
import { AuthContext } from "../utils/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { truncateString } from "../lib/utilities";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import confetti from "canvas-confetti";

const Explorers = () => {
  const {
    address,
    signer,
    contract,
    provider,
    chainId,
    web3Provider,
    connect,
    disconnect,
  } = useContext(AuthContext);
  const [explorers, setexplorers] = useState([]);
  const [usd, setusdeth] = useState("");
  async function getExplorers() {
    const res = await signer?.getExplorer();
    // const filt = res.filter((items) => items?.projectId?.toString() === id);
    setexplorers(res);
  }

  async function getEthUsd() {
    const getUsd = await signer?.getEthUsd();
    setusdeth(getUsd);
  }

  useEffect(() => {
    getExplorers();
    getEthUsd();
    console.log(address);
  }, [signer]);

  return (
    <div>
      <Header />
      <section className="section bg-secondary" id="about">
        <div className="container mx-auto mt-5">
          <h2 className="section-title text-center relative before:absolute before:opacity-40 before:-top-[2rem] before:-left-3/4 before:hidden before:lg:block">
            Explorers{" "}
          </h2>
          <>
            <div className="grid grid-cols-2 mx-8 pb-8  sm:grid-cols-4 mt-4 gap-5">
              {explorers?.map((explorer) => (
                <div className="rounded-2xl  flex flex-col items-center text-center">
                  <div className="mb-2">
                    <img
                      className="rounded-full w-full"
                      src={explorer?.image}
                      alt=""
                    />
                  </div>
                  <Link to={`/explorer/${explorer?.id?.toString()}`}>
                    <p className="capitalize text-accent text-sm mb-1">
                      {explorer?.name}{" "}
                    </p>
                  </Link>
                  <h3 className="text-2xl font-semibold capitalize mb-1">
                    {explorer?.country}{" "}
                  </h3>
                  <p className="text-base pb-4 max-w-md">
                    {truncateString(explorer?.bio, 60)}
                  </p>
                </div>
              ))}
            </div>
          </>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Explorers;
