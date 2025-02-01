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

# Feedback
If you have any feedback or suggestions, please reach out to us at garv_s@cs.iitr.ac.in
