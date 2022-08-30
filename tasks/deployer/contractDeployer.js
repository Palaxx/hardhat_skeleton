const { types } = require('hardhat/config')

const config = require('./../../src/config')
const { genericDeployer } = require('./genericDeployer')

const deployer = genericDeployer(
  'CONTRACT',
  (args) => [config.contracts.contract.variable1, args.variable2],
  {
    taskRegister: (task) => {
      task('deployContract', 'Deploy contract')
        .addOptionalParam(
          'addressNumber',
          'Number of the signer zero based',
          0,
          types.int
        )
        .addOptionalParam('verifyAddress', 'Address', '', types.string)
        .addParam('variable2', 'Variable 2 value')
        .setAction(deployer.task)
    },
  }
)
module.exports = deployer
