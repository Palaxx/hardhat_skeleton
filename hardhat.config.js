require('@nomiclabs/hardhat-web3')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('solidity-coverage')
require('hardhat-gas-reporter')
require('hardhat-deploy')

const { task } = require('hardhat/config')

const config = require('./src/config')
const taskRegister = require('./tasks')

taskRegister(task)
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  etherscan: {
    apiKey: config.deploy.verify_api_key,
  },
  // defaultNetwork: "testnet",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: 'https://rpc.ankr.com/bsc',
      },
    },

    bscTestnet: {
      url: config.deploy.network_url,
      chainId: 97,
      gasPrice: 10000000000,
      accounts: { mnemonic: config.deploy.mnemonic },
    },

    bsc: {
      url: config.deploy.network_url,
      chainId: 56,
      gasPrice: 5000000000,
      accounts: { mnemonic: config.deploy.mnemonic },
    },

    ethRinkeby: {
      url: config.deploy.network_url,
      accounts: { mnemonic: config.deploy.mnemonic },
    },
    eth: {
      url: config.deploy.network_url,
      accounts: { mnemonic: config.deploy.mnemonic },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: config.deploy.optimizer_runs,
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './tests/contracts/',
  },

  gasReporter: {
    token: 'BNB',
    currency: 'USD',
    gasPriceApi: 'https://api.bscscan.com/api?module=proxy&action=eth_gasPrice',
    coinmarketcap: '67955bfe-a914-4521-889c-afb7346a307f',
    enabled: false,
  },
}
