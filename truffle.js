var HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = process.env.TEST_MNETONIC || 'bacon bacon bacon bacon bacon bacon';

const ropstenProvider = new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/');
const kovanProvider = new HDWalletProvider(mnemonic, 'https://kovan.infura.io');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3,
      provider: ropstenProvider,
      gas: 4.7e6,
    },
    kovan: {
      network_id: 42,
      provider: kovanProvider,
      gas: 5e6,
    },
  }
};
