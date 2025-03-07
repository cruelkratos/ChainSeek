# ChainSeek
*AI-Powered Insurance for Smart Contracts*  
"Predict Risk. Automate Protection. Secure the Future."
1. **ChainSeek** is a powerful deep lerning based insurance system for smart contracts, where we use *BERT* for calculation appropriate premium amount for each smart contract.
2. On chain monitoring is used to detect any kind of exploit in the contract and initiate coverage payment.
3. All forms of user data, decisions and policies have been decentralized using smart contracts to avoid the abuse of power.

Group Members (in alphabetical order)

| S.No. | Name             | devfolio ID    |
| ----- | ---------------- | -------------- |
| 1.    | Garv Sethi       | cruelkratos    |
| 2.    | Granth Gaud      | -------------- |
| 3.    | Kunal Bansal     | fr092          |
| 4.    | Mmukul Khedekar  | fooker         |

# System Design

<img src="https://github.com/cruelkratos/ChainSeek/raw/main/design.png" alt="ChainSeek Design">

##  Contracts & Deployment Information

### 1️⃣ **Data.sol**  
- **Contract Address:** [`0x03438c46B230995395e0Ec191FD41598479a1fC8`](https://sepolia.etherscan.io/address/0x03438c46B230995395e0Ec191FD41598479a1fC8)  
- **Transaction Hash:** [`0x9579f7fbdd74c1239d324d910f2d1eac3f356cbfb850c108862cf309295c17f9`](https://sepolia.etherscan.io/tx/0x9579f7fbdd74c1239d324d910f2d1eac3f356cbfb850c108862cf309295c17f9)

---

### 2️⃣ **Premium.sol**  
- **Contract Address:** [`0xFD23eB42CC59Cd21c7A7bbBfDE195CfFb5A5f3cA`](https://sepolia.etherscan.io/address/0xFD23eB42CC59Cd21c7A7bbBfDE195CfFb5A5f3cA)  
- **Transaction Hash:** [`0x02f5dd8927aa67ab7beb11b7c1733127d912d7ecb4b9cf5cf75b8ad54fb290ff`](https://sepolia.etherscan.io/tx/0x02f5dd8927aa67ab7beb11b7c1733127d912d7ecb4b9cf5cf75b8ad54fb290ff)

---

### 3️⃣ **Payout.sol**  
- **Contract Address:** [`0xBBa0aC4FBd17fF340FF32A8Ea7E53Ba1606b503c`](https://sepolia.etherscan.io/address/0xBBa0aC4FBd17fF340FF32A8Ea7E53Ba1606b503c)  
- **Transaction Hash:** [`0xa380df65aeed6488aa9499deeec22fdeb238e5301be09fded9ac13e092bd07dd`](https://sepolia.etherscan.io/tx/0xa380df65aeed6488aa9499deeec22fdeb238e5301be09fded9ac13e092bd07dd)

---

## 🌐 **Network:**  
- **Testnet:** Sepolia  
- **Blockchain Explorer:** [Sepolia Etherscan](https://sepolia.etherscan.io/)

---

# Requirements
- Nodejs 
- Python (3.10)

# Steps for Installation: 
1. Clone the repository in your local directory using the command `git clone https://github.com/cruelkratos/ChainSeek.git`
2. Change directory to cloned Repository `cd ChainSeek`
3. Install backend and hardhat dependencies `npm install`
4. Install frontend dependencies `cd frontend && npm install`
5. Install python dependencies `cd engine`
6. Creation and activating the virtual environment:
`python -m venv chainseek`
`env\Scripts\activate.bat`
7. Install dependencies `pip install -r requirements.txt` for windows and `pip3 install -r requirements.txt` for mac and linux

# Steps to run frontend:
1. `cd frontend`
2. `npm run dev`

# Steps to run the backend:
1. `npx hardhat node`
2. `npm start`

# Steps to run ML server:
1. `cd engine`
2. `python server.py` for windows and `python3 server.py` for mac and linux

## Video Demo

[Demo Here!](https://youtu.be/hNAkQdMb-fs?si=BRaE_L8AU8WUaPFo)

# Feedback
If you have any feedback or suggestions, please reach out to us at garv_s@cs.iitr.ac.in
