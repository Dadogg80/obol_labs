# # README for Gas Optimization Assignment: Distribute.sol

## Description

This assignment focused on gas optimizing a smart contract named `Distribute.sol`. The key objective was to enhance the efficiency of the `distribute()` function within a tight timeframe of one hour, without altering the Solidity version or adding any extra functionalities to the contract.

## Assignment Overview

### The Objective

- **Task**: Improve the gas cost of calling the `distribute()` function in the `Distribute` contract.
- **Constraints**:
  - Do not change the Solidity version.
  - Do not add extra functionality or behavior to the contract.
- **Timeframe**: 1 hour.

### My Process

1. **Optimize `distribute()`**: I decided to focus only on reducing the gas consumption of the `distribute()` function.
2. **Unit Testing for Gas Usage**: To save time, I nly wrote two unit-tests per contract, my goal was to have enough to just determine the gas usage.
3. **Documentation**: I spent the last time I had left to write this README.

## The changes in my Optimized Contract

### Key Changes

1. **Immutable Variable**: Changed `createTime` to an immutable variable `distributeTime`, added with `2 weeks` set at contract deployment instead of inside `distribute()`.
2. **Internal Visibility**: Changed the state variables `distributeTime` and `contributors` to internal variables.
3. **Custom Error**: Replaced the `require` statement with a custom error `Code1`.

### Gas Usage Results

- **`distribute()` Function**:
  - Original: 90656 gas
  - Optimized: 88321 gas

- **Deployment Gas Usage**:
  - Original: 602781 gas
  - Optimized: 445416 gas

## How to Run

1. **Clone the Repository**: Clone the git repository to your local machine.
2. **Install Dependencies**: Run `yarn` to install required dependencies.
3. **Testing**: Execute unit tests with `yarn test` to verify functionality and gas usage.
4. **Gas Reporting**: The gas usage can be seen using the Hardhat gas reporter. Make sure to have it configured in your Hardhat setup.

## Screenshot

![screenshot of Gas Reporter](/gas_usage.png)

## Additional Information

- **License**: MIT
- **Author**: @dadogg80
