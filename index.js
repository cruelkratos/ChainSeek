import express from 'express';
import testRoutes from './routes/testRoutes.js';
import premiumRoutes from './routes/premiumRoutes.js';
import payoutRoutes from './routes/payoutRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import flaskRoutes from './routes/flaskRoutes.js';
import hardhat from 'hardhat';
import ethers from 'hardhat';
import multer from 'multer';
import solc from 'solc';
import cors from 'cors';  // Import CORS
import path from 'path';
import contractAddressPromise from './scripts/deploy.js';
import fs from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const frontendPort = 3000;
const frontendUrl = `http://127.0.0.1:${frontendPort}`;

const backendPort = 3001;
const backendUrl = `http://127.0.0.1:${backendPort}`;

const flaskPort = 5001;
const flaskUrl = `http://127.0.0.1:${flaskPort}`;

const devnetPort = 8545;
const devnetUrl = `http://127.0.0.1:${devnetPort}`;

let dataContractAddress = null;
let premiumContractAddress = null;
let payoutContractAddress = null;
let crowdfundingContractAddress = null; // comment this out, supposed to get from <- frontend <- user
let accounts = null;

// Use CORS middleware
app.use(cors());  // Allow all origins by default

app.use(express.json());

// test routes 
app.use("/test", testRoutes);

// data.sol smart contract routes
app.use("/data", dataRoutes);

// premium.sol routes -> addclient and paypremium
app.use("/api/premium", premiumRoutes);

// payout.sol routes -> payout to client
app.use("/api/payout", payoutRoutes)

// flask routes
app.use("/flask", flaskRoutes)

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/compile', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const contractFilename = req.file.originalname; // Get original filename
    const contractSource = req.file.buffer.toString('utf8');
    console.log('Contract Source:', contractSource); // Log the contract content

    try {
        const input = {
            language: 'Solidity',
            sources: {
                [contractFilename]: { // Use dynamic filename
                    content: contractSource,
                },
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['abi', 'evm.bytecode.object'],
                    },
                },
            },
        };

        const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

        if (compiled.errors) {
            console.error("Compilation errors:", compiled.errors);
            return res.status(400).json({ errors: compiled.errors });
        }

        const compiledContracts = compiled.contracts[contractFilename];

        if (!compiledContracts) {
            console.error("No contracts found in compilation output");
            return res.status(400).json({ error: 'No contracts found in compiled output' });
        }

        // console.log("Compiled contracts:", compiledContracts);

        // Extract contract name dynamically
        const contractName = Object.keys(compiledContracts)[0]; // Get the first contract found
        const contractABI = compiledContracts[contractName]?.abi;

        if (!contractABI) {
            console.error("ABI not found for contract:", contractName);
            return res.status(400).json({ error: `ABI not found for contract ${contractName}` });
        }

        console.log("start")
        console.log(contractABI);
        console.log("end")

        res.json({
            _abi: contractABI
        });
    } catch (error) {
        console.error('Compilation error:', error);
        return res.status(500).json({ error: 'Error during compilation.' });
    }
});

app.post("/monitor", async (req, res) => {
    try {
        const { abi, contract_address } = req.body;
        
        if (!contract_address) {
            return res.status(400).json({ error: "Contract address required" });
        }

        const scriptPath = path.join(__dirname, 'scripts', 'chain-monitor.js');
        
        if (!fs.existsSync(scriptPath)) {
            return res.status(500).json({ 
                error: "Monitor script not found",
                path: scriptPath 
            });
        }

        const child = spawn('node', [scriptPath, contract_address, JSON.stringify(abi)], {
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        child.on('error', (err) => {
            console.error(`Child process error: ${err}`);
            if (!res.headersSent) {
                res.status(500).json({ 
                    error: "Failed to start monitor",
                    details: err.message 
                });
            }
        });

        child.stdout.on('data', (data) => {
            console.log(`[Monitor ${contract_address}]: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`[Monitor ERROR ${contract_address}]: ${data}`);
            if (!res.headersSent) {
                res.status(500).json({ 
                    error: "Monitor process error",
                    details: data.toString() 
                });
            }
        });

        child.on('exit', async (code) => {
            console.log(`Monitor exited with code ${code}`);

            const payload = {
                contract_address: contract_address,
                time: Math.round(Date.now() / 1000)
            }   

            const response = await fetch("http://localhost:3001/api/payout/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
        
                body: JSON.stringify(payload),
            })

            const payout = await response.json()
            console.log(payout);

            if (code !== 0 && !res.headersSent) {
                res.status(500).json({ 
                    error: "Monitor process crashed",
                    exitCode: code 
                });
            }
        });

        setTimeout(() => {
            if (!res.headersSent) {
                res.json({ 
                    message: "Monitoring started",
                    contract_address,
                    pid: child.pid 
                });
            }
        }, 500);

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ 
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

app.listen(backendPort, async () => {
    try {
        console.log(`Express server running at: ${backendUrl}`);
        
        const smartContractAddresses = await contractAddressPromise;
        
        dataContractAddress = smartContractAddresses.dataContractAddress;
        premiumContractAddress = smartContractAddresses.premiumContractAddress;
        payoutContractAddress = smartContractAddresses.payoutContractAddress;
        crowdfundingContractAddress = smartContractAddresses.crowdfundingContractAddress;
        accounts = smartContractAddresses.accounts;

        console.log("Data Contract address:", dataContractAddress);
        console.log("Premium Contract address:", premiumContractAddress);
        console.log("Payout Contract address:", payoutContractAddress);
        console.log("Test Contract address:", crowdfundingContractAddress);
                
        return { dataContractAddress, premiumContractAddress, payoutContractAddress, crowdfundingContractAddress, accounts };
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
});

export { 
    dataContractAddress,
    premiumContractAddress, 
    payoutContractAddress, 
    crowdfundingContractAddress,
    accounts,
    backendUrl,
    flaskUrl,
    devnetUrl
};