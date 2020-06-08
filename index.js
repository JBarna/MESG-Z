
const liteflow = new (require('@liteflow/service'))()

// launch server on PORT 43805
const server = require('./zapier/server')

liteflow.listenTask({
  execute: require('./tasks/execute').startTask,
  loadSample: require('./tasks/loadSample').startTask
})
  .on('error', (error) => console.error(error))

liteflow.emitEvent('started', { x: true })
  .catch((error) => console.error(error))
