'use strict'

const path = require('path')

const envSchema = require('env-schema')
const S = require('fluent-json-schema')

let dotenv = true
if (process.env.NODE_ENV === 'test') {
  dotenv = { path: path.resolve(__dirname, '../tests/.env') }
} else if (process.env.NODE_ENV) {
  dotenv = { path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`) }
}

const config = envSchema({
  schema: S.object()
    .prop('WALLET_MNEMONIC', S.string().required())
    .prop('VERIFY_API_KEY', S.string().required())
    .prop('OPTIMIZER_RUNS', S.number().default(200))
    .prop('NETWORK_URL', S.string().required())
    .prop('CONTRACT_VARIABLE_1', S.string().default('variable_1')),
  dotenv,
})

module.exports = {
  env: config.NODE_ENV,
  deploy: {
    mnemonic: config.WALLET_MNEMONIC,
    verify_api_key: config.VERIFY_API_KEY,
    optimizer_runs: config.OPTIMIZER_RUNS,
    network_url: config.NETWORK_URL,
  },

  contracts: {
    contract: {
      variable1: config.CONTRACT_VARIABLE_1,
    },
  },
}
