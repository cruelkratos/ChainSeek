import express from 'express';
const router = express.Router();
import { flaskUrl } from '../index.js';
import axios from 'axios';

router.post("/", async (req, res) => {
    try {
        const { code, coverageAmount } = req.body;
        console.log(code);
        console.log("hi");
        console.log(coverageAmount);
        // if (!code || !coverageAmount) {
        //     return res.status(400).json({ 
        //         error: "Missing required fields: code and coverageAmount" 
        //     });
        // }

        console.log(code);
        console.log(coverageAmount);

        const requestData = {
            code: code,
            coverage_amt: parseFloat(coverageAmount)
        };

        console.log(requestData)

        const response = await axios.post(
            `${flaskUrl}/predict_premium`,
            requestData,
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 60000
            }
        );

        res.json({
            premium_amt: response.data.premium_amt
        });

    } catch (error) {
        console.error("Prediction error:", error);
        if (error.response) {
            res.status(error.response.status).json({
                error: error.response.data.error || "Prediction service error"
            });
        } else if (error.request) {
            res.status(504).json({ 
                error: "Prediction service timeout" 
            });
        } else {
            res.status(500).json({ 
                error: "Internal server error" 
            });
        }
    }
})

export default router;