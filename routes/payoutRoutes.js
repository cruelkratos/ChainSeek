import express from 'express';
import hardhat from 'hardhat';
const { ethers } = hardhat;
import { dataContractAddress, payoutContractAddress, accounts } from '../index.js';

const router = express.Router(); 

// invoke payout
// supply the client address in request body params 
// router.post('/', async (req, res) => {
//     try {
//         const { clientAddress } = req.body;
//         const insurer = accounts[0];
//         const payoutContract = await ethers.getContractAt("Payout", payoutContractAddress);
        
//         // Get required payout amount
//         const payoutAmount = await payoutContract.getClientPayout(clientAddress);
        
//         // Send transaction with explicit value
//         const tx = await payoutContract.sendPayout(clientAddress, {
//             value: payoutAmount.toString() // Convert BigNumber to string
//         });
        
//         await tx.wait();

//         res.json({
//             success: true,
//             transactionHash: tx.hash,
//             clientAddress,
//             payoutAmount: ethers.formatEther(payoutAmount)
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             error: error.reason?.replace("execution reverted: ", "") || error.message 
//         });
//     }
// });

router.post('/', async (req, res) => {
    try {
        const { contract_address, time } = req.body;
        
        if (!contract_address || !ethers.isAddress(contract_address)) {
            return res.status(400).json({ error: "Invalid contract address" });
        }

        const [insurer] = accounts;
        const payoutContract = await ethers.getContractAt(
            "Payout",
            payoutContractAddress,
            insurer.signer
        );

        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress
        );

        const [status, coverageAmt, expiryTime] = await Promise.all([
            dataContract.get_status(contract_address),
            dataContract.get_coverage_amt(contract_address),
            dataContract.get_time_rem(contract_address)
        ]);

        // if (status !== 1n) {
        //     return res.status(400).json({ 
        //         error: status === 3n ? "Payout already completed" : 
        //               "Contract not eligible for payout"
        //     });
        // }

        // if (coverageAmt === 0n) {
        //     return res.status(400).json({ error: "No coverage amount set" });
        // }

        // if (BigInt(Math.floor(Date.now()/1000)) > expiryTime) {
        //     return res.status(400).json({ error: "Coverage period expired" });
        // }

        // const insurerBalance = await ethers.provider.getBalance(insurer.address);
        // if (insurerBalance < coverageAmt) {
        //     return res.status(402).json({
        //         error: "Insufficient insurer funds",
        //         required: ethers.formatEther(coverageAmt),
        //         available: ethers.formatEther(insurerBalance)
        //     });
        // }

        const tx = await payoutContract.sendPayout(contract_address, time, {
            value: coverageAmt.toString()
        });
        const receipt = await tx.wait();

        if (receipt.status !== 1) {
            throw new Error("Transaction reverted");
        }

        const newStatus = await dataContract.get_status(contract_address);

        res.json({
            success: true,
            transactionHash: tx.hash,
            contractAddress: contract_address,
            payoutAmount: ethers.formatEther(coverageAmt),
            recipient: await dataContract.get_wallet_address(contract_address),
            newStatus: Number(newStatus)
        });

    } catch (error) {
        console.error("Payout error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
            
        res.status(500).json({
            error: errorMessage,
            details: error.info?.error?.data?.reason || null
        });
    }
});

export default router;