// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Test {
    event Failed();
    uint256 public deployTime;

    constructor() {
        deployTime = block.timestamp; 
    }

    function emitEvent() external {
        require(block.timestamp >= deployTime + 15, "Wait for 15 seconds!");
        emit Failed();
    }
}