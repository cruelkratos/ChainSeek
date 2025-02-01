// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Data{
    mapping(address => address[]) wallet_contract;
    mapping(address => address) contract_wallet;
    mapping(address => uint) contract_premium;
    mapping(address => uint) contract_coverage;
    mapping(address => uint) contract_time;
    mapping(address => uint) contract_status;  // 0 Not Active, 1 Active, 2 Fucked but not paid, 3 Fucked and paid

    address payable public author; // all authors are same

    constructor () {
        author = payable(msg.sender);
    }

    function add_client(address wallet_address, address contract_address, uint premium_amt, uint coverage_amt, uint time) public {
        require(msg.sender == author, "You are not authorised");
        require(contract_wallet[contract_address] == address(0), "already insured");
        wallet_contract[wallet_address].push(contract_address);
        contract_wallet[contract_address] = wallet_address;
        contract_premium[contract_address] = premium_amt;
        contract_coverage[contract_address] = coverage_amt;
        contract_time[contract_address] = time;
        contract_status[contract_address] = 0;
    }

    // function set_premium_amt(address contract_address, uint premium_amt) public {
    //     contract_premium[contract_address] = premium_amt;
    // }

    // function set_coverage_amt(address contract_address, uint coverage_amt) public {
    //     contract_coverage[contract_address] = coverage_amt;   
    // }

    function set_status(address contract_address, uint status) public{
        contract_status[contract_address] = status;
    }

    function set_time(address contract_address, uint time) public {
        contract_time[contract_address] = block.timestamp + time;
    }

    function get_premium_amt(address contract_address) public view returns (uint) {
        return contract_premium[contract_address];
    }

    function get_coverage_amt(address contract_address) public view returns (uint) {
        return contract_coverage[contract_address];
    }

    function get_status(address contract_address) public view returns (uint){
        return contract_status[contract_address];
    }

    function get_contract_addresses(address wallet_address) public view returns (address[] memory){
        return wallet_contract[wallet_address];
    }

    function get_wallet_address(address contract_address) public view returns (address){
        return contract_wallet[contract_address];
    }

    function get_time_rem(address contract_address) public view returns (uint) {
        return contract_time[contract_address];
    }

    function get_blockchain_time() public view returns (uint) {
        return block.timestamp;
    }
}