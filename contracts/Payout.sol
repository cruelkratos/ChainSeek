// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./data.sol";

contract Payout{
    Data db;
    address payable public author; // all authors are same

    event Sent(address indexed recipient, uint amount);

    constructor (address db_address){
        db = Data(db_address);
        author = payable(msg.sender);
    }

     function sendPayout(address contract_address, uint time) external payable{
        require(msg.sender == author, "You are not authorized");
        require(db.get_status(contract_address) == 1, "You are not eligible for payment");
        require(time <= 60 + db.get_time_rem(contract_address), "You are not eligible for payment");

        uint coverage_amt = db.get_coverage_amt(contract_address);
        require(coverage_amt == msg.value, "Inconsistent data");
        
        address payable wallet_address = payable(db.get_wallet_address(contract_address));
        
        (bool success, ) = wallet_address.call{value: coverage_amt}("");
        require(success, "ETH transfer failed");
        db.set_status(contract_address, 3);
        emit Sent(wallet_address, coverage_amt);
    }
}
