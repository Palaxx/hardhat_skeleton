const { task } = require('hardhat/config')

const { tasks: deployerTasks } = require('./deployer')
const tasks = [...deployerTasks]

module.exports = () => {
  tasks.forEach((register) => {
    register.taskRegister(task)
  })
}
