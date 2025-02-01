import express from 'express';
import hardhat from 'hardhat';
const { ethers } = hardhat;
import { dataContractAddress, premiumContractAddress, payoutContractAddress, accounts } from '../index.js';

const router = express.Router();

// get the data.sol smart contract deployed address
router.get("/data", (req, res) => {
    console.log("data called");
    res.json({
        address: dataContractAddress
    });
});

// get the premium.sol smart contract deployed address 
router.get("/premium", (req, res) => {
    console.log("premium called");
    res.json({
        address: premiumContractAddress
    });
});

// get the payout.sol smart contract deployed address
router.get("/payout", (req, res) => {
    console.log("payout called");
    res.json({
        address: payoutContractAddress
    });
});

// get the account address and balance by id
router.get("/accounts/:id", async (req, res) => {
    const id = req.params.id;

    if (isNaN(id) || id < 0 || id > 19) {
        return res.status(400).json({ error: "Invalid account ID. Must be between 0 and 19." });
    }

    try {
        const balanceWei = await ethers.provider.getBalance(accounts[id].address);
        const balanceEth = ethers.formatEther(balanceWei);

        res.json({
            id: id,
            address: accounts[id].address,
            balance: balanceEth 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get balance by account address
router.get("/balance/:address", async (req, res) => {
    const address = req.params.address;

    try {
        const balanceWei = await ethers.provider.getBalance(address);
        const balanceEth = ethers.formatEther(balanceWei);

        res.json({
            address: address,
            balance: balanceEth 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// router.post("/invoke", async (req, res) => {
//     const insurer = accounts[0];
//     const testContract = await ethers.getContractAt(
//         "Test",
//         testContractAddress,
//         insurer
//     );

//     const tx = await testContract.emitEvent();
//     await tx.wait();

//     res.json({
//         success: true,
//         transactionHash: tx.hash
//     });
// })

export default router;