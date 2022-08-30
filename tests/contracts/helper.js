const { ethers } = require('hardhat')

let contract = null

async function deployContract(creator, args) {
  const factory = await ethers.getContractFactory('CONTRACT', {
    signer: creator,
  })

  contract = await factory.deploy(...args)
  await contract.deployed()
  return contract
}

async function sampleSum(number1, number2) {
  const transaction = await contract.sampleSum(number1, number2)
  return await transaction
}

module.exports = {
  deploy: deployContract,
  contract,
  sampleSum,
}
