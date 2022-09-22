// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    string[] links;

    constructor() {
        console.log("I am a contract and I am smart!");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() view public returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function resetWaves() public {
        console.log("Resetting waves to 0!");
        totalWaves = 0;
    }

    function addLink(string memory _link) public {
        console.log("Adding link %s", _link);
        links.push(_link);
    }

    function getLinks() view public returns (string[] memory) {
        console.log("Getting links");
        return links;
    }
}
