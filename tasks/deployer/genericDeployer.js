const { sleep } = require('../../src/utils')

async function getCreator(hre, addressNumber) {
  const accounts = await hre.ethers.getSigners()
  return accounts[addressNumber]
}

const deployerTask = (factoryName, constructorArguments, customOptions) => {
  function getConstructorArguments(taskArg) {
    if (typeof constructorArguments === 'function') {
      return constructorArguments(taskArg)
    }

    return constructorArguments
  }
  let deployer = {
    postVerify: () => console.log('Post deployer empty task'),
    deploy: async (hre, addressNumber, taskArgs) => {
      const factory = await hre.ethers.getContractFactory(factoryName, {
        signer: await getCreator(hre, addressNumber),
      })

      const contract = await factory.deploy(
        ...getConstructorArguments(taskArgs)
      )

      await contract.deployed()

      console.log(`Contract ${factoryName} deployed to: ${contract.address}`)

      return contract
    },
    verify: async (hre, address, taskArgs) => {
      await hre.run('verify:verify', {
        address,
        constructorArguments: getConstructorArguments(taskArgs),
      })
    },

    task: async (taskArgs, hre) => {
      if (taskArgs.verifyAddress) {
        await deployer.verify(hre, taskArgs.verifyAddress, taskArgs)
      }

      const contract = await deployer.deploy(
        hre,
        taskArgs.addressNumber,
        taskArgs
      )

      if (hre.network.name !== 'hardhat') {
        await sleep(20000)
        await deployer.verify(hre, contract.address, taskArgs)
      }

      await deployer.postVerify(hre, contract)

      return contract.address
    },
  }
  deployer = { ...deployer, ...customOptions }
  return deployer
}

module.exports = {
  genericDeployer: deployerTask,
  getCreator,
}
