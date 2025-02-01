// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./data.sol";

contract Premium{
    Data db;
    address payable public author;

    event PremiumReceived(address indexed client, uint amount);

    constructor (address db_address){
        db = Data(db_address);
        author = payable(msg.sender);
    }

    function payPremium(address contract_address, uint time) public payable {
        uint premium_amt = db.get_premium_amt(contract_address);
        require(msg.value == premium_amt, "Incorrect premium amount");

        (bool success, ) = author.call{value: msg.value}("");
        require(success, "ETH transfer failed");
        db.set_status(contract_address, 1);
        db.set_time(contract_address, time);
        emit PremiumReceived(msg.sender, msg.value);
    }
}
