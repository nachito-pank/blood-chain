require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();  // Assure-toi que dotenv est inclus

module.exports = {
  solidity: "0.8.0",  // La version de Solidity que tu utilises
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,  // URL Sepolia tirée de .env
      accounts: [process.env.PRIVATE_KEY],  // Clé privée tirée de .env
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,  // API Etherscan pour la vérification (optionnel)
  },
};
