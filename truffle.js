var HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = process.env.TEST_MNETONIC || 'burger bacon burger bacon burger bacon burger bacon burger bacon burger bacon';

const ropstenProvider = new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/');
const kovanProvider = new HDWalletProvider(mnemonic, 'https://kovan.aragon.one');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      provider: require('ethereumjs-testrpc').provider({ gasLimit: 1e8 }),
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3,
      provider: ropstenProvider,
      gas: 4.2e6,
    },
    kovan: {
      network_id: 42,
      provider: kovanProvider,
      gas: 4.7e6,
    },
  }
};
