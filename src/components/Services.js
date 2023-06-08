import { ethers } from "ethers";
import React, { useState, useContext, useEffect } from "react";
// import services data
import { services } from "../data";
import { AuthContext } from "../utils/AuthProvider";

const Services = () => {
  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);
  const [land, setland] = useState(0);
  const [ocean, setocean] = useState(0);
  const [poverty, setpoverty] = useState(0);
  const [climateChange, setclimateChange] = useState(0);
  async function loadAmount() {
    const land = await signer?.getCategoryPrice("Land");
    const ocean = await signer?.getCategoryPrice("Ocean Explorers");
    const poverty = await signer?.getCategoryPrice("Poverty");
    const climateChange = await signer?.getCategoryPrice("Climate Change");
    setland(land);
    setocean(ocean);
    setpoverty(poverty);
    setclimateChange(climateChange);
  }

  useEffect(() => {
    loadAmount();
  }, [signer]);

  return (
    <section id="services" className="section bg-tertiary">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="section-title relative before:absolute before:opacity-40 before:-top-[2rem] before:-left-28 before:hidden before:lg:block">
            Total Amount of Money we have raised so far{" "}
          </h2>
          <p className="subtitle">
            For each of the SDG Goals, below are the total amount we have
            accumulated so far
          </p>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const { icon, name, description } = service;
            return (
              <div className="bg-secondary p-6 rounded-2xl" key={index}>
                <div className="text-green-400 rounded-sm w-12 h-12 flex justify-center items-center mb-24 text-[28px]">
                  {icon}
                </div>
                <h4 className="text-4xl font-medium mb-2">
                  {parseFloat(
                    Number(
                      ethers.utils.formatEther(
                        service.id == 1
                          ? ocean?.toString() || 0
                          : service.id == 2
                          ? land?.toString() || 0
                          : service.id == 3
                          ? climateChange?.toString() || 0
                          : service.id == 4
                          ? poverty?.toString() || 0
                          : 0
                      )
                    ) || 0
                  ).toFixed(3) || 0}
                  {""}
                  ETH
                </h4>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
