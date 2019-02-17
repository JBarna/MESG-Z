const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')
const hookHand = require('./captainHook')
const task = require('../tasks/execute')
const samples = require('../tasks/loadSample')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// used to verify the connection can be made from zapier
app.get('/verify', (req, res) => {

  // just return positive
  res.status(200)
  res.end(JSON.stringify({}))
})

// pull samples for our zap type
app.get('/api/samples/:type', (req, res) => {

  const type = req.params.type
  const sample = samples.pullSample(type)

  res.status(200)
  res.end(JSON.stringify(sample))
})

// used to subscribe a hook from zapier 
app.post('/api/hooks', async (req, res) => {

  // handle incoming hook
  const body = req.body

  // save the zap id and url
  console.log('this is the subscribe', body)

  const id = hookHand.saveHook(body)

  res.status(200)
  res.end(JSON.stringify({ id }))
})

// used to unsubscribe a webhook from zapier
app.delete('/api/hooks/:hookId', async (req, res) => {

  // handle incoming hook
  const hookId = req.params.hookId

  // save the zap id and url
  console.log('this is the unsubscribe', hookId)
  hookHand.deleteHook(hookId)

  res.status(200)
  res.end(JSON.stringify({}))
})

// used to receive data from Zapier
app.post('/api/data', async (req, res) => {

  // handle incoming hook
  const body = req.body

  // save the zap id and url
  console.log('received data back from zapier', body)

  task.receiveData(body)

  res.status(200)
  res.end(JSON.stringify({ ok: true }))
})


// listen for incoming requests
app.listen(43805, () => console.log('Example app listening on port 43805!'))


// function test(){ 
//   const success = console.log.bind(null, 'sucessfn')
// const error = console.log.bind(null, 'errorFn')

// const triggerType = process.argv[2]
// const data = { data: 'this is data',  num: 4 }


// task.startTask({triggerType, data}, { success, error })
// }

// setTimeout(test, 500)