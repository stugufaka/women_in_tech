import React, { useState, useContext, useEffect } from "react";
import AlbumCover1 from "../assets/img/nature.jpeg";
import ProfileImg from "../assets/img/profile.jpeg";
import { Badge } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";
import { ethers } from "ethers";
import { ellipseAddress, truncateString } from "../lib/utilities";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
// import NavMobile from "./NavMobile";
import axios from "axios";
const Profile = () => {
  const [active, setactive] = useState(1);
  const [album, setAlbums] = useState([]);
  const [myassets, setnfts] = useState([]);
  const [user, setuser] = useState([]);
  const [userprojects, setuserprojects] = useState([]);
  const [visible2, setVisible2] = React.useState(false);
  const [amount, setamount] = useState("");
  const [isloading, setisloading] = useState(false);
  const [userid, setuserid] = useState("");

  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);
  const tabs = [
    { id: 1, name: "Projects", icon: "briefcase-outline" },
    // { id: 4, name: "Assets", icon: "library-outline" },
    // { id: 5, name: "Sell NFT", icon: "wallet-outline" },
    // { id: 6, name: "Dashboard", icon: "apps-outline" },
  ];

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  async function isRegistered() {
    const res = await signer?.isRegisteredFunc();
    console.log(res);
    if (res === false) {
      window.location.href = "/create-profile";
    }
  }

  async function getExplorer() {
    const res = await signer?.getExplorer();
    const filt = res.filter((items) => items.owner === address);
    localStorage.setItem("explorerId", filt[0]?.id?.toString());
    localStorage.setItem("explorerName", filt[0]?.name?.toString());
    setuser(filt);
  }

  async function getProjects() {
    const res = await signer?.getProject();
    const filt = res.filter((items) => items.owner === address);
    setuserprojects(filt);
  }
  useEffect(() => {
    connect();
    getExplorer();
    getProjects();
    isRegistered();
    console.log(address);
  }, [signer]);
  return (
    <div className="bg-gray-900 ">
      <>
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
                // setuserid(userinfo?.artistId?.toString());
                // onTipUser();
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
        <div className="relative">
          <div className=" bg-gray-900 relative w-full  bg-opacity-10 ring-1 ring-white ring-opacity-20 backdrop-blur-lg ">
            <img src={AlbumCover1} className="object-cover h-56 w-full" />
          </div>

          <img
            src={user[0]?.image}
            className="object-cover absolute -bottom-10 rounded-full h-28 w-28 ring-4 ring-gray-800 left-1/2 -translate-x-1/2  m-auto "
          />
        </div>
        <div className="flex flex-col mt-12 items-center justify-center">
          <div className="flex flex-row space-x-2">
            <Link to="/">
              <Badge color="warning" className="py-2">
                Back Home
              </Badge>
            </Link>
            <Link to="/create-project">
              <Badge color="success" className="py-2">
                Create Project{" "}
              </Badge>
            </Link>
            <Link to="/create-profile">
              <Badge color="primary" className="py-2">
                Edit Profile
              </Badge>
            </Link>
          </div>
          <p className="text-2xl font-bold">{user[0]?.name}</p>
          <p className="text-xl ">{user[0]?.bio}</p>
          <div className="flex flex-row space-x-2">
            <div className="w-max my-2 bg-white bg-opacity-10 ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-2xl px-3 py-0.5 m-auto">
              {ellipseAddress(user[0]?.owner, 4)}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-row items-center justify-center space-x-4 my-4 ">
            {tabs.map((items, index) => (
              <div
                onClick={() => {
                  setactive(items.id);
                }}
                key={index}
                className={`${
                  items.id === active ? "ring-green-400" : " cursor-pointer"
                }  w-max my-2 bg-white bg-opacity-10 flex flex-row space-x-2 items-center ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-xl px-3 py-0.5 cursor-default `}
              >
                <ion-icon name={items.icon} class="text-xl pr-2"></ion-icon>
                {items.name}
              </div>
            ))}
          </div>
        </div>

        {active === 1 ? (
          <>
            <div className="grid grid-cols-2 mx-8 pb-8  sm:grid-cols-4 mt-4 gap-5">
              {userprojects?.map((project) => (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-8">
                    <img className="rounded-2xl" src={project?.cover} alt="" />
                  </div>
                  <p className="capitalize text-accent text-sm mb-3">
                    {project?.title}{" "}
                  </p>
                  <h3 className="text-2xl font-semibold capitalize mb-3">
                    {project?.country}{" "}
                  </h3>
                  <p className="text-base max-w-md">
                    {truncateString(project?.description, 60)}{" "}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Profile;
