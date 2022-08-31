# Hardhat skeleton project
The goal of this repository is to provide a starting point for the next solidity projects.

### Hardhat tasks
Hardhat task are exposed by `tasks/index.js` file. 
Adding a new task should be done pushing a new element into the **tasks** array. 
The new object should implement the registerTask function which is in charge to create the [task in hardhat](https://hardhat.org/hardhat-runner/docs/advanced/create-task)

```javascript
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
    }
}
```
The created tasks can be run with:

```shell
npx hardhat deployContract --network bsc
```

### Environments files
The project contains a **.env.sample** file, which should represents the entire list of environment variables used.
The file is under version control, so is important to not include sensible information on it.

Environment variables, in this sample project, are used in hardhat configurations and during the contract deploy

Every time a task is executed the .env file, which should not be versioned, is loaded.
You can force the project to load a different files prepend your shell command with `NODE_ENV=xxx`
```shell
# It call the task named deployContract, using the hardhat network called bsc. The environment variables are loaded from .env
npx hardhat deployContract --network bsc

# it make same stuff of the previous one but load variable from .env.bsc
NODE_ENV=bsc npx hardhat deployContract --network bsc
```
Can be helpfully to have different configuration based on the chain (Ex: pancake router address change between bsc testnet and mainnet).

### Tests
The repository contains some dummy tests, which deploy the contract and make some simple assertions.

Tests should be run with:
```shell
npm run test
```