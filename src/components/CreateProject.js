import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import FileViewer from "react-file-viewer";
import { Progress } from "@nextui-org/react";
import { AuthContext } from "../utils/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Logo2 from "../assets/img/wit.svg";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";

const CreateProject = () => {
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [country, setcountry] = useState("");
  const [community, setcommunity] = useState("");
  const [target, settarget] = useState(0);
  const [description, setdescription] = useState("");
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
  console.log("address", address);
  const projectId = "2DB3mQQJtzIC03GYarET8tFZJIm";
  const projectSecret = "0dedd8064ff788414096e72cc7e3f4a1";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfsClient = require("ipfs-http-client");
  console.log(auth);
  const ipfs = ipfsClient.create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });

  const [isloading, setisloading] = useState(false);

  const [file, setFile] = useState("");
  const [filetype, setfiletype] = useState("");
  const [filesize, setfilesize] = useState("");
  const [isfileuploading, setisfileuploading] = useState(false);

  const onError = (err) => {
    console.log("Error:", err); // Write your own logic
  };
  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNCQzQzMDliYTJGRGIxMDZGZWM0YzJGMTJiZmE4RTMwQTUzMTZiZDUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI0OTA3ODUyMjUsIm5hbWUiOiJkZWNlbnRyb2dlIn0.kcD-OCoPPtPAYR9Ph_cOfz0A9Jl_KamPPmo20j0Q1Dc";
    // return token;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function onChange(e) {
    setisloading(true);
    const files = e.target.files[0];
    const client = makeStorageClient();
    const cid = await client.put([files]);
    console.log("stored files with cid:", cid);

    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(
        `failed to get ${cid} - [${res.status}] ${res.statusText}`
      );
    }

    // unpack File objects from the response
    const filess = await res.files();
    setFile(`https://${cid}.ipfs.dweb.link/${files.name}`);
    // console.log(file);
    console.log(files);
    setisloading(false);
    for (const file of filess) {
      setfiletype(file.name);
      setfilesize(file.size);
      console.log(
        `${file.cid} -- ${file.path} -- ${file.size} -- ${file.name}`
      );
    }
    return cid;
  }

  function getExtension() {
    return filetype.split(".").pop();
  }

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  const onUploadFile = async () => {
    if (
      file == "" ||
      title == "" ||
      category == "" ||
      community == "" ||
      target == "" ||
      description == ""
    ) {
      alert("all fields required");
      return;
    }
    setisfileuploading(true);
    const amount_ = ethers.utils.parseUnits(target.toString(), "ether");
    var expId = localStorage.getItem("explorerId");
    var expname = localStorage.getItem("explorerName");
    let transaction = await signer.createProject(
      file,
      title,
      country,
      category,
      community,
      amount_,
      description,
      expId,
      expname
    );
    let txReceipt = await transaction.wait();
    const [transferEvent] = txReceipt.events;
    console.log(transferEvent);
    settitle("");
    setcategory("");
    setcountry("");
    setcommunity("");
    settarget("");
    setdescription("");
    setisfileuploading(false);
    setFile("");
    notify("Project Created Successfully");
    window.location.href = "/dashboard";
  };

  return (
    <div className="bg-[#111827]  px-10 ">
      <Toaster />

      <div className="flex flex-row justify-between  items-center">
        <div className="  hidden lg:flex lex-row font-Montserrat items-center space-x-5 text-2xl"></div>
        <div className="flex flex-row space-x-3">
          {/* <Input clearable bordered placeholder="search" /> */}
          {/* {web3Provider ? ( */}
        </div>
      </div>
      <img src={Logo2} alt="" className="w-8 mt-4 mx-auto" />
      <p className="text-xl pt-3 pb-3 font-Montserrat text-center mx-auto flex flex-row justify-center items-center">
        Create a Project
      </p>

      <div class="flex items-center justify-center w-11/12 md:w-7/12 m-auto bg-gray-800 py-8 shadow-2xl p-8 rounded-2xl">
        <div class=" w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div class="mb-5">
                <label for="text" className="pb-5">
                  Title
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  placeholder="title"
                  className="w-full rounded-xl border mt-3  bg-gray-800 py-3 px-6 text-base font-medium text-white outline-none focus:shadow-xl"
                />
              </div>
              <div class="mb-5">
                <label for="text" className="pb-5">
                  SDG goal{" "}
                </label>
                <select
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                  className="w-full rounded-xl border mt-3  bg-gray-800 py-3 px-6 text-base font-medium text-white outline-none focus:shadow-xl"
                >
                  <option value="">Select option</option>
                  <option value="Ocean Explorers">Life Below Water</option>
                  <option value="Land">Life on Land</option>
                  <option value="Poverty">No poverty</option>
                  <option value="Climate Change">Climate Action</option>
                </select>
              </div>
              <div class="mb-5">
                <label for="text" className="pb-5">
                  Country
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  value={country}
                  onChange={(e) => {
                    setcountry(e.target.value);
                  }}
                  placeholder="country"
                  className="w-full rounded-xl border mt-3  bg-gray-800 py-3 px-6 text-base font-medium text-white outline-none focus:shadow-xl"
                />
              </div>
            </div>
            <div>
              <div class="mb-5">
                <label for="text" className="pb-5">
                  Community
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  value={community}
                  onChange={(e) => {
                    setcommunity(e.target.value);
                  }}
                  placeholder="community"
                  className="w-full rounded-xl border mt-3  bg-gray-800 py-3 px-6 text-base font-medium text-white outline-none focus:shadow-xl"
                />
              </div>
              <div class="mb-5">
                <label for="text" className="pb-5">
                  Targeted Amount
                </label>
                <input
                  type="number"
                  name="text"
                  id="text"
                  placeholder="eth"
                  value={target}
                  onChange={(e) => {
                    settarget(e.target.value);
                  }}
                  placeholder="amount in ETH"
                  className="w-full rounded-xl border mt-3  bg-gray-800 py-3 px-6 text-base font-medium text-white outline-none focus:shadow-xl"
                />
              </div>
              <div class="mb-5">
                <label for="email" className="pb-5 mt-3">
                  Project Description
                </label>

                <textarea
                  type="text"
                  name="text"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                  id="email"
                  placeholder="description"
                  className="w-full rounded-xl border mt-3 bg-gray-800 py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="max-w-full mb-6">
            <label for="text" className="pb-5">
              Project Image
            </label>
            <label class="flex mt-3 justify-center w-full h-32 px-4 transition bg-white dark:bg-gray-800 border-2 border-gray-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="font-medium text-gray-600">
                  Click here to select file
                  {/* <span class="text-blue-600 underline">browse</span> */}
                </span>
              </span>
              <input
                type="file"
                name="file_upload"
                class="hidden"
                onChange={onChange}
              />
            </label>
          </div>
          {file && (
            <FileViewer
              fileType={getExtension()}
              filePath={file}
              // errorComponent={CustomErrorComponent}
              onError={onError}
            />
          )}

          {isloading ? (
            <div className="flex flex-row items-center justify-center">
              <Progress
                indeterminated
                value={50}
                color="secondary"
                status="secondary"
              />
            </div>
          ) : (
            ""
          )}

          {file && (
            <div>
              <button
                onClick={() => {
                  onUploadFile();
                }}
                class="hover:shadow-form w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Save{" "}
              </button>
            </div>
          )}
          {isfileuploading ? (
            <Progress
              indeterminated
              value={50}
              color="primary"
              status="primary"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
