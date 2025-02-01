import express from 'express';
import hardhat from 'hardhat';
const { ethers } = hardhat; 
import { dataContractAddress, premiumContractAddress, payoutContractAddress, accounts } from '../index.js';

const router = express.Router();

router.post("/addclient", async (req, res) => {
    try {
        const { wallet_address, contract_address, premium_amount, coverage_amount, time } = req.body;

        console.log(wallet_address);
        console.log(contract_address);
        console.log(premium_amount);
        console.log(coverage_amount);
        console.log(time)

        // if (!ethers.isAddress(wallet_address) || !ethers.isAddress(contract_address)) {
        //     return res.status(400).json({ error: "Invalid Ethereum address" });
        // }

        // if (isNaN(premium_amount) || isNaN(coverage_amount)) {
        //     return res.status(400).json({ error: "Invalid amount values" });
        // }

        const premiumWei = ethers.parseEther(premium_amount.toString());
        const coverageWei = ethers.parseEther(coverage_amount.toString());

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer 
        );

        const tx = await dataContract.add_client(
            wallet_address,
            contract_address,
            premiumWei,
            coverageWei,
            time
        );

        await tx.wait();

        res.json({
            success: true,
            transactionHash: tx.hash,
            walletAddress: wallet_address,
            contractAddress: contract_address,
            premiumWei: ethers.formatEther(premiumWei.toString()),
            coverageWei: ethers.formatEther(coverageWei.toString())
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
});

router.post("/setpremiumamt", async (req, res) => {
    try {
        const { contract_address, premium_amount } = req.body;
        const premiumWei = ethers.parseEther(premium_amount.toString());

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const tx = await dataContract.set_premium_amt(contract_address, premiumWei);

        await tx.wait();

        res.json({
            success: true,
            transactionHash: tx.hash,
            contract_address: contract_address,
            premium_amount: ethers.formatEther(premiumWei.toString())
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/setcoverageamt", async (req, res) => {
    try {
        const { contract_address, coverage_amount } = req.body;
        const coverageWei = ethers.parseEther(coverage_amount.toString());

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const tx = await dataContract.set_coverage_amt(contract_address, coverageWei);

        await tx.wait();

        res.json({
            success: true,
            transactionHash: tx.hash,
            contract_address: contract_address,
            coverage_amount: ethers.formatEther(coverageWei.toString())
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/setstatus", async (req, res) => {
    try {
        const { contract_address, status } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const tx = await dataContract.set_status(contract_address, status);

        await tx.wait();

        res.json({
            success: true,
            transactionHash: tx.hash,
            contract_address: contract_address,
            status: status
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

// check why settime is not updating the response from gettimerem
router.post("/settime", async (req, res) => {
    try {
        const { contract_address, time } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const tx = await dataContract.set_status(contract_address, time);

        await tx.wait();

        res.json({
            success: true,
            transactionHash: tx.hash,
            contract_address: contract_address,
            time: time
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/getpremiumamount", async (req, res) => {
    try {
        const { contract_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const premiumAmount = await dataContract.get_premium_amt(contract_address);

        res.json({
            success: true,
            premium_amount: ethers.formatEther(premiumAmount.toString()) 
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/getcoverageamount", async (req, res) => {
    try {
        const { contract_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const coverageAmount = await dataContract.get_coverage_amt(contract_address);

        res.json({
            success: true,
            coverage_amount: ethers.formatEther(coverageAmount.toString()) 
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }

})

router.post("/getstatus", async (req, res) => {
    try {
        const { contract_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const status = await dataContract.get_status(contract_address);

        res.json({
            success: true,
            status: status.toString()
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/getcontractaddresses", async (req, res) => { 
    try {
        const { wallet_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const contractAddressesVector = await dataContract.get_contract_addresses(wallet_address);
        const premiumAmountVector = [];
        const coverageAmountVector = [];
        const timeRemVector = [];
        const statusVector = [];
        
        for (const address of contractAddressesVector) {
            const [premiumAmount, coverageAmount, timeRem, status] = await Promise.all([
                dataContract.get_premium_amt(address),
                dataContract.get_coverage_amt(address),
                dataContract.get_time_rem(address),
                dataContract.get_status(address),
            ]);
            
            const time2 = await dataContract.get_blockchain_time();
            const timeRemBigInt = BigInt(timeRem)
            const time2BigInt = BigInt(time2)
            const timeLeft = Math.max(Number(timeRemBigInt - time2BigInt), 0); // Prevent negative time
        
            premiumAmountVector.push(premiumAmount.toString()); // Convert to string
            coverageAmountVector.push(coverageAmount.toString()); // Convert to string
            timeRemVector.push(timeLeft.toString()); // timeLeft is already a number, no need to convert
            statusVector.push(status.toString());
        }

        res.json({
            success: true,
            contract_addresses: contractAddressesVector,
            premium_amounts: premiumAmountVector,
            coverage_amounts: coverageAmountVector,
            time_rems: timeRemVector,
            statuses: statusVector
        });
        // console.log(res);

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }

})

router.post("/getwalletaddress", async (req, res) => {
    try {
        const { contract_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const walletAddress = await dataContract.get_wallet_address(contract_address);

        res.json({
            success: true,
            walletAddress: walletAddress.toString() 
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/gettimerem", async (req, res) => {
    try {
        const { contract_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const time_rem = await dataContract.get_time_rem(contract_address);

        res.json({
            success: true,
            time_rem: time_rem.toString() 
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post("/getblockchaintime", async (req, res) => {
    try {
        const { contract_address } = req.body;

        const [insurer] = accounts;
        const dataContract = await ethers.getContractAt(
            "Data",
            dataContractAddress,
            insurer.signer
        );

        const blockchain_time = await dataContract.get_blockchain_time();

        res.json({
            success: true,
            blockchain_time: blockchain_time.toString() 
        });

    } catch (error) {
        console.error("Client error:", error);
        const errorMessage = error.reason 
            ? error.reason.replace("execution reverted: ", "")
            : error.message;
        res.status(500).json({ error: errorMessage });
    }
})

export default router;