import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", accountBalance.toString());

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.01"),
  });
  await waveContract.deployed();
  console.log("WavePortal address:", waveContract.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
