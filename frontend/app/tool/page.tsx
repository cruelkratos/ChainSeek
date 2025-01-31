"use client";
import { ArrowRight } from "lucide-react"
import {ethers} from "ethers";
import type React from "react" // Added import for React

const connectMetaMask = async() =>{
  if(window.ethereum) {
    console.log("Installed hai!");
    try {
      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Get the user's wallet address
      const userWalletAddress = accounts[0];
      console.log("Connected Wallet Address:", userWalletAddress);

      // Return or use the wallet address
      return userWalletAddress;
    } catch (error) {
      console.error("User rejected the request or an error occurred:", error);
    }
  }
  
}

export default function GetStarted() {
  return (
    <>
    <button onClick={connectMetaMask}>Hello</button>
    </>
  )
}

