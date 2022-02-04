import { ethers } from "hardhat";

const main = async () => {
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log(`contract address: ${waveContract.address}`);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log(`contract balance: ${ethers.utils.formatEther(contractBalance)}`);

  let waveTxn = await waveContract.wave("Hello World");
  await waveTxn.wait();

  console.log("wave tnx: ", waveTxn);
  console.log("--- Waved Hello World ---");

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log(`contract balance: ${ethers.utils.formatEther(contractBalance)}`);

  waveTxn = await waveContract.wave("Its me again!");
  await waveTxn.wait();
  console.log("--- Waved Its me again! ---");

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log(`contract balance: ${ethers.utils.formatEther(contractBalance)}`);

  const count = await waveContract.getTotalWaves();
  console.log("Total waves:", count.toNumber());

  const waves = await waveContract.getWaves();
  console.log("Waves:", waves);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
