const { ethers } = require("hardhat");

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  simpleStorageAddress = simpleStorage.target;
  console.log(`Contract deployed to: ${simpleStorageAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
