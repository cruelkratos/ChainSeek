import hardhat from 'hardhat';
const { ethers } = hardhat;

async function deployContract() {
  const accounts = await ethers.getSigners();
  console.log("The insurance firm account is:", accounts[0].address);

  // deploy data.sol
  const Data = await ethers.getContractFactory("Data");
  const dataContract = await Data.deploy();
  await dataContract.waitForDeployment();
  const dataContractAddress = await dataContract.getAddress();

  // deploy premium.sol
  const Premium = await ethers.getContractFactory("Premium");
  const premiumContract = await Premium.deploy(dataContractAddress);
  await premiumContract.waitForDeployment();
  const premiumContractAddress = await premiumContract.getAddress();

  // deploy payout.sol
  const Payout = await ethers.getContractFactory("Payout");
  const payoutContract = await Payout.deploy(dataContractAddress); // pass the address of premium smart contract
  await payoutContract.waitForDeployment();
  const payoutContractAddress = await payoutContract.getAddress();

  // deploy test.sol
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfundingContract = await Crowdfunding.deploy();
  await crowdfundingContract.waitForDeployment();
  const crowdfundingContractAddress = await crowdfundingContract.getAddress();

  const Vuln = await ethers.getContractFactory("Vuln");
  const VulnContract = await Vuln.deploy();
  await VulnContract.waitForDeployment();
  const vulncontractaddress = await VulnContract.getAddress();

  console.log("vuln address:", vulncontractaddress);

  // const exploit = await ethers.getContractFactory("exploit");
  // const exploitContract = await exploit.deploy(vulncontractaddress);
  // await exploitContract.waitForDeployment();
  // const exploitcontractaddress = await exploitContract.getAddress();

  // console.log("exploit address:", exploitcontractaddress);

  return { dataContractAddress, premiumContractAddress, payoutContractAddress, crowdfundingContractAddress, accounts };
}

export default deployContract().catch((error) => {
  console.error(error);
  process.exit(1);
});