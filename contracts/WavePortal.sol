// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    struct Link {
        string link;
        uint256 timestamp;
        uint256 waveCount;
    }

    Link[] links;

    struct Wave {
        address waver;
        Link link;
        uint256 timestamp;
    }

    Wave[] waves;

    event NewWave(Wave wave);
    event NewLink(Link link);

    constructor() {
        console.log("I am a contract and I am smart!");
    }

    function wave() public {
        Wave memory wave = Wave(msg.sender, Link("", block.timestamp, 0), block.timestamp);
        waves.push(wave);
        emit NewWave(wave);
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() view public returns (uint256) {
        console.log("We have %d total waves!", waves.length);
        return waves.length;
    }

    function getWaves() view public returns (Wave[] memory) {
        return waves;
    }

    function resetWaves() public {
        console.log("Resetting waves to 0!");
        delete waves;
    }

    function addLink(string memory _link) public {
        if (bytes(getLink(_link).link).length == 0) {
            Link memory link = Link(_link, block.timestamp, 0);
            links.push(link);
            emit NewLink(link);
            console.log("%s has added a link : %s", msg.sender, _link);
        }
    }

    function getLinks() view public returns (Link[] memory) {
        console.log("Getting links");
        return links;
    }

    function getLink(string memory _link) view public returns (Link memory) {
        console.log("Getting link");
        Link memory newLink = Link("", 0, 0);
        for (uint i = 0; i < links.length; i++) {
            if (keccak256(abi.encodePacked(links[i].link)) == keccak256(abi.encodePacked(_link))) {
                newLink = links[i];
                newLink.waveCount = getNumberOfWaveByLink(_link);
                return newLink;
            }
        }
        return newLink;
    }

    function getNumberOfWaveByLink(string memory _link) view private returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < waves.length; i++) {
            if (keccak256(abi.encodePacked(waves[i].link.link)) == keccak256(abi.encodePacked(_link))) {
                count++;
            }
        }
        return count;
    }

    function waveLink(string memory _link) public {
        Link memory link = getLink(_link);
        if (link.timestamp != 0) {
            Wave memory wave = Wave(msg.sender, link, block.timestamp);
            link.waveCount++;
            waves.push(wave);
            emit NewWave(wave);
            console.log("%s has waved!", msg.sender);
        } else {
            console.log("Error : Link not found");
        }
    }

    function validateYoutubeLink(string memory _link) view public returns (bool) {
        string memory youtubeUrlRegex = "^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.?be)\\/.+$";
        bool matchRegex = (keccak256(abi.encodePacked(_link)) == keccak256(abi.encodePacked(youtubeUrlRegex)));

        console.log("Match regex : %s", matchRegex);
        return matchRegex;
    }
}
