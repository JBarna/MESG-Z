const mesg = require('mesg-js').service()

// launch server on PORT 43805
const server = require('./zapier/server')

mesg.listenTask({
  execute: require('./tasks/execute'),
  loadSample: require('./tasks/loadSample')
})
  .on('error', (error) => console.error(error))

mesg.emitEvent('started', { x: true })
  .catch((error) => console.error(error))
