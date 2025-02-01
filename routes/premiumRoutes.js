import express from 'express';
import hardhat from 'hardhat';
const { ethers } = hardhat;
import { backendUrl, dataContractAddress, premiumContractAddress, accounts } from '../index.js';
import axios from 'axios';

const router = express.Router(); 

// addclient: 
// pass the client's address
// pass the premium amount
// pass the payout amount
// this should add the client to the insurancefirm database 
// router.post("/addclient", async (req, res) => {
//     try {
//         const { clientAddress, premium, payout } = req.body;

//         if (!clientAddress || !premium || !payout) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         if (!ethers.isAddress(clientAddress)) {
//             return res.status(400).json({ error: "Invalid Ethereum address" });
//         }

//         const premiumWei = ethers.parseEther(premium.toString());
//         const payoutWei = ethers.parseEther(payout.toString());

//         const insurer = accounts[0];
//         const premiumContract = await ethers.getContractAt(
//             "Premium",
//             premiumContractAddress,
//             insurer
//         );

//         const tx = await premiumContract.addClient(
//             clientAddress,
//             premiumWei,
//             payoutWei
//         );
        
//         await tx.wait(); 

//         res.json({
//             success: true,
//             transactionHash: tx.hash,
//             clientAddress,
//             premium: premiumWei.toString(),
//             payout: payoutWei.toString()
//         });

//     } catch (error) {
//         console.error("Add client error:", error);
//         res.status(500).json({ 
//             error: error.reason || error.message || "Transaction failed" 
//         });
//     }
// });

// paypremium: 
// pass the accountId in request body (can change this later to address)
// triggers the client to complete a payment and transfer eth to insurancefirm
// TODO: metamask integration in the frontend
// router.post("/", async (req, res) => {
//     try {
//         const contractAddress = req.body.contract_address;

//         const insurer = accounts[0];
//         const premiumContract = await ethers.getContractAt(
//             "Premium",
//             premiumContractAddress,
//             insurer
//         );
        
//         const requiredPremiumWei = await premiumContract.prem_pay(clientAddress);
        
//         if (requiredPremiumWei === 0n) {
//             return res.status(400).json({ error: "Client not registered" });
//         }

//         const clientBalance = await ethers.provider.getBalance(clientAddress);
//         if (clientBalance < requiredPremiumWei) {
//             return res.status(400).json({ error: "Insufficient client balance" });
//         }

//         const clientContract = premiumContract.connect(client);

//         const tx = await clientContract.payPremium({
//             value: requiredPremiumWei
//         });
        
//         await tx.wait();

//         res.json({
//             success: true,
//             transactionHash: tx.hash,
//             clientAddress,
//             premiumPaid: ethers.formatEther(requiredPremiumWei)
//         });

//     } catch (error) {
//         console.error("Premium payment error:", error);
//         res.status(500).json({
//             error: error.reason?.replace("execution reverted: ", "") || error.message
//         });
//     }
// });

router.post("/paypremium", async (req, res) => {
    try {
        const { wallet_address, contract_address, premium_amount, coverage_amount, time } = req.body;
        const clientSigner = await ethers.getSigner(wallet_address);
        
        console.log(wallet_address)
        console.log(contract_address)
        console.log(premium_amount)
        console.log(coverage_amount)
        console.log(time)

        // const requestData = {
        //     wallet_address: wallet_address,
        //     contract_address: contract_address,
        //     premium_amount: premium_amount,
        //     coverage_amount
        // };

        // const response = await axios.post(
        //     `${backendUrl}/data/addclient`,
        //     requestData,
        //     {
        //         headers: { 'Content-Type': 'application/json' },
        //         timeout: 60000
        //     }
        // );

        // console.log(response)

        const premiumContract = await ethers.getContractAt(
            "Premium",
            premiumContractAddress,
            clientSigner
        );

        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress
        );

        console.log("post data contract")

        // Verify contract exists and get premium amount
        const requiredPremiumWei = await dataContract.get_premium_amt(contract_address);
        const contractStatus = await dataContract.get_status(contract_address);

        if (requiredPremiumWei === 0n) {
            return res.status(400).json({ error: "Contract not found or premium not set" });
        }

        console.log("post if statement")

        const clientAddress = await clientSigner.getAddress();
        console.log("clientaddr: ",clientAddress)
        const clientBalance = await ethers.provider.getBalance(clientAddress);
        console.log("clientBal: ", clientBalance)
        console.log("reqPremWei: ",requiredPremiumWei)
        
        if (clientBalance < requiredPremiumWei) {
            return res.status(400).json({
                error: "Insufficient balance",
                required: ethers.formatEther(requiredPremiumWei),
                available: ethers.formatEther(clientBalance)
            });
        }

        console.log("post if statement clientbalance")

        const tx = await premiumContract.payPremium(contract_address, time, {
            value: requiredPremiumWei.toString()
        });

        const receipt = await tx.wait();

        if (receipt.status !== 1) {
            throw new Error("Transaction reverted");
        }

        const newStatus = await dataContract.get_status(contract_address);
        const coverageExpiry = await dataContract.get_time_rem(contract_address);

        console.log("Premium paid successfully:")

        res.json({
            success: true,
            transactionHash: tx.hash,
            contractAddress: contract_address,
            premiumPaid: ethers.formatEther(requiredPremiumWei),
            newStatus: Number(newStatus),
            coverageExpiry: Number(coverageExpiry),
            clientAddress
        });

    } catch (error) {
        console.error("Premium payment error:", error);
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