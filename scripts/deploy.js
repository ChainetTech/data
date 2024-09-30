const hre = require("hardhat");

async function main() {
  console.log("Deploying PropertyRecords contract to Sepolia...");

  // We get the contract to deploy
  const PropertyRecords = await hre.ethers.getContractFactory("PropertyRecords");
  const propertyRecords = await PropertyRecords.deploy();

  await propertyRecords.deployed();

  console.log("PropertyRecords deployed to:", propertyRecords.address);

  console.log("Waiting for 6 block confirmations...");
  await propertyRecords.deployTransaction.wait(6);

  // Verify the contract on Etherscan
  console.log("Verifying contract on Etherscan...");
  await hre.run("verify:verify", {
    address: propertyRecords.address,
    constructorArguments: [],
  });

  console.log("Contract verified on Etherscan");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });