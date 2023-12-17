import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  networks: {
    hardhat: {},
  },
  gasReporter: {
    gasPrice: 21,
    enabled: true,
  }
};

export default config;