// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  uint256 private seed;

  struct Wave {
    address sender;
    string message;
    uint256 timestamp;
    bool result;
  }

  mapping(address => uint256) public lastWavedAt;
  Wave[] private waves;

  event NewWave(
    address sender,
    string message,
    uint256 timesamp,
    bool result,
    uint256 seed
  );

  constructor() payable {
    console.log("Hello decentralized world!");
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function wave(string memory message) public {
    require(
      lastWavedAt[msg.sender] + 15 seconds < block.timestamp,
      "Wait 15 secs"
    );
    lastWavedAt[msg.sender] = block.timestamp;
    totalWaves += 1;

    console.log("%s has waved!!", msg.sender);

    seed = (block.timestamp + block.difficulty) % 100;
    bool won = (seed < 50);

    console.log("seed: %d, won: %s", seed, won);
    waves.push(Wave(msg.sender, message, block.timestamp, won));

    if (won) {
      console.log("%s won!", msg.sender);

      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount < address(this).balance,
        "Trying to withdraw more money than the contract has."
      );

      (bool success, ) = (msg.sender).call{ value: prizeAmount }("");
      require(success, "Trying to withdraw money from contract.");
    }

    emit NewWave(msg.sender, message, block.timestamp, won, seed);
  }

  function getWaves() public view returns (Wave[] memory) {
    return waves;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d waves at the moment!", totalWaves);
    return totalWaves;
  }
}
