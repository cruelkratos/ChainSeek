import hardhat from 'hardhat';
const { ethers } = hardhat;

import fs from 'fs'

const monitorDummyContract = async () => {
    const [deployer] = await ethers.getSigners();
    console.log("started");

    // const contractAddress = contract_address;
    const contractAddress = process.argv[2];
    // const contractABI = JSON.parse(fs.readFileSync("./artifacts/contracts/vuln.sol/Vuln.json", 'utf-8'))["abi"]
    const contractABI = JSON.parse(process.argv[3]);
    console.log(contractABI);
    const provider = new ethers.WebSocketProvider("ws://localhost:8545");

    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    let failureCount = 0;
    let successCount = 0;
    let lastTransactionValue = 1000;
    let currentTransactionValue = 0;

    const checkAbnormalBehaviour = async () => {
      const failureRate = failureCount / (failureCount + successCount);
      const increaseRate = (currentTransactionValue - lastTransactionValue) / lastTransactionValue;
      if (failureRate > 0.8 || increaseRate > 5) {
        console.log("Abnormal Behaviour detected");
        process.exit(0);
      }
      lastTransactionValue = Math.max(1000, currentTransactionValue);
      currentTransactionValue = 0;
      failureCount = 0;
      successCount = 0;
    };

    contract.on("Failure", () => {
      failureCount++;
    });

    contract.on("Success", (amount) => {
      successCount++;
      currentTransactionValue += Number(amount);
    });

    setInterval(checkAbnormalBehaviour, 1000);
  };

  monitorDummyContract().catch(console.error);