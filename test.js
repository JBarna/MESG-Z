const task = require('./tasks/execute')

const success = console.log.bind(null, 'sucessfn')
const error = console.log.bind(null, 'errorFn')

const triggerType = process.argv[2]
const data = { data: 'this is data',  num: 4 }


task.startTask({triggerType, data}, { success, error })