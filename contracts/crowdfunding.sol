// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Crowdfunding {
    address public author;
    mapping(address => uint256) public joined;
    uint256 public Target = 10 ether;
    uint256 public price = 0.035 ether;
    uint256 public endTime;
    bool public close = false;

    // event Failed();
    event Success(address recieving_address, uint amount);

    constructor() {
        author = msg.sender;
        endTime = block.timestamp + 30 days;
    }

    function updatePrice() internal {
        uint rise = address(this).balance / 1 ether * 0.002 ether;
        price = 0.02 ether + rise;
    }

    receive() external payable {
        require(block.timestamp < endTime && !close, "Crowdfunding has closed");
        require(msg.value >= price, "Not enough payment");
        joined[msg.sender] = msg.value;
        updatePrice();
    }

    function withdrawFund() external {
        require(msg.sender == author, "You are not author");
        require(address(this).balance >= Target, "Target hasn't been reached");
        close = true;
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdraw() external {
        require(!close, "Closed");
        require(address(this).balance < Target, "Target reached");
        uint return_amt = joined[msg.sender] - 0.04 ether;
        payable(msg.sender).transfer(return_amt);
        emit Success(msg.sender, return_amt);
    }
}
