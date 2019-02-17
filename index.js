const mesg = require('mesg-js').service()

// launch server on PORT 43805
const server = require('./zapier/server')

mesg.listenTask({
  execute: require('./tasks/execute').startTask,
  loadSample: require('./tasks/loadSample').startTask
})
  .on('error', (error) => console.error(error))

mesg.emitEvent('started', { x: true })
  .catch((error) => console.error(error))
