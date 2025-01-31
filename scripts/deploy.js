const { ethers } = require("hardhat");

async function main() {
  // Get contract factory
  const Contract = await ethers.getContractFactory("MyContract");

  // Deploy contract
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(`Contract deployed to: ${contract.address}`);
}

// Run script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
