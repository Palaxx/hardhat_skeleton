const { ethers } = require('hardhat')
const { expect } = require('chai')

const { deploy, sampleSum } = require('./helper')

describe('Contract test', () => {
  let creator
  let contract
  beforeEach(async () => {
    ;[creator] = await ethers.getSigners()
    contract = await deploy(creator, ['variable1', 'variable2'])
  })

  it('should return right values of constructor variables', async () => {
    expect(await contract.variable1()).to.be.equal('variable1')
    expect(await contract.variable2()).to.be.equal('variable2')
  })

  it('sampleSum should return right result', async () => {
    expect(await sampleSum(1, 2)).to.be.equal(3)
  })
})
