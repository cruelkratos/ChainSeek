// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Vuln {
    event Failure();
    event Success(uint amount);

    function fail() public {
        emit Failure();
    }

    function transfer_money() public {
        emit Success(1000);
    }
}
