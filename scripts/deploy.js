const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;

  const World3 = await hre.ethers.getContractFactory("World3");
  const world3 = await World3.deploy();

  await world3.deployed();

  txHash = world3.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let world3address = txReceipt.contractAddress;

  console.log("World3 contract address", world3address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
