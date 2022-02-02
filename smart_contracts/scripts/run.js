const sleep = (millis) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
  return promise;
};

const main = async () => {
  const [owner, randomPerson, secondRandomPerson] =
    await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log(
    "---------------------------CONTRACT INFO---------------------------"
  );
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);
  console.log(
    "-------------------------------------------------------------------"
  );

  console.log("\n\n\n");

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  await sleep(3000);

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  await sleep(2000);
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  await sleep(1000);
  waveTxn = await waveContract.connect(secondRandomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
