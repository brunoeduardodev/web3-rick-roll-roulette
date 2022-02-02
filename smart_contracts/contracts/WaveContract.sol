// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  uint lastWaveTimestamp;

  mapping (address => uint) public waversCount;

  constructor() {
    console.log("Hello decentralized world!");
  }

  function wave() public {
    totalWaves += 1;
    waversCount[msg.sender] += 1;
    console.log("%s has waved!!", msg.sender);
  
    if(totalWaves == 1) {
      console.log("%c %s sent the first wave of the contract!", "color: #ff0000", msg.sender);
    } else {
      uint timeDifference = block.timestamp - lastWaveTimestamp;
      console.log("This wave was sent %d seconds since the last wave", timeDifference);
    }

    if(waversCount[msg.sender] == 1) {
      console.log("That's the first wave from %s", msg.sender);
    } else {
      console.log("That's the %dth time %s is waving", waversCount[msg.sender], msg.sender);
    }
      console.log("-------------------------------------------------------------------\n\n\n");
    lastWaveTimestamp = block.timestamp;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d waves at the moment!", totalWaves);
    return totalWaves;
  }
}

