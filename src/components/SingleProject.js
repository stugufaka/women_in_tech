import React, { useState, useEffect, useContext } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Image from "../assets/img/about.webp";
import AlbumCover1 from "../assets/img/nature.jpeg";
import { AuthContext } from "../utils/AuthProvider";
import { useParams } from "react-router-dom";
import { truncateString } from "../lib/utilities";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import confetti from "canvas-confetti";

const SingleProject = () => {
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

  const { id } = useParams();
  const [project, setproject] = useState({});
  const [usdeth, setusdeth] = useState("");
  const [visible2, setVisible2] = React.useState(false);
  const [amount, setamount] = useState("");
  const [isloading, setisloading] = useState(false);
  const handleConfetti = () => {
    confetti();
  };
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };
  async function getProjects() {
    const res = await contract?.getProject();
    const filt = res.filter((items) => items?.projectId?.toString() === id);
    setproject(filt[0]);
  }

  const onAddSponser = async () => {
    const amount_ = ethers.utils.parseUnits(amount, "ether");
    let projectid = project?.projectId?.toString();
    let userid = localStorage.getItem("explorerId");
    let categoryname = project?.sdgCategory;
    let transaction = await signer.addSponser(projectid, userid, categoryname, {
      value: amount_,
    });
    setisloading(true);
    let hash = await transaction.wait();
    setisloading(false);
    setVisible2(false);
    notify("Congratulation for Sponsoring this project");
    handleConfetti();
  };

  async function getEthUsd() {
    const getUsd = await contract?.getEthUsd();
    setusdeth(getUsd);
  }

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  useEffect(() => {
    getProjects();
    getEthUsd();
    console.log(address);
  }, [signer, contract]);

  return (
    <div>
      <Toaster />
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible2}
        onClose={closeHandler2}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Enter an amount <Text b size={18}></Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            required
            value={amount}
            onChange={(e) => {
              setamount(e.target.value);
            }}
            placeholder="Enter amount(eth)"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler2}>
            Close
          </Button>
          <Button
            auto
            onClick={() => {
              onAddSponser();
            }}
          >
            {isloading ? (
              <Loading size="xs" color="white" className="pr-4" />
            ) : (
              ""
            )}
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Header />
      <section className="section bg-secondary" id="about">
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row gap-24">
            <img
              className="object-cover h-full w-[566px] md:mx-auto lg:mx-0 rounded-2xl"
              src={project?.cover}
              alt=""
            />
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="flex flex-col">
                <h2 className="text-3xl lg:text-4xl font-medium lg:font-extrabold mb-3 relative before:absolute before:opacity-40 before:-top-[2rem] before:hidden before:lg:block">
                  {project?.title}
                </h2>
                <p className="mb-2 text-accent">{project?.sdgCategory}</p>
                <p className="mb-2">@{project?.explorerName}</p>
                <p className="text-xl font-Montserrat font-bold">
                  {parseFloat(
                    Number(
                      ethers.utils.formatEther(
                        project?.amountRecieved?.toString() || 0
                      )
                    ) || 0
                  ).toFixed(3) || 0}{" "}
                  ETH
                </p>
                <p className="mb-8">{project?.description}</p>
              </div>
              <button
                onClick={() => {
                  setVisible2(true);
                }}
                className="btn btn-md bg-green-600  md:btn-lg transition-all"
              >
                sponsor
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SingleProject;
