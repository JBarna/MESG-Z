// const MESG = require('mesg-js').service()
const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')
const hookHand = require('./captainHook')

const fs = require('fs')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// used to verify the connection can be made from zapier
app.get('/verify', (req, res) => {

  // just return positive
  res.status(200)
  res.end(JSON.stringify({}))
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

  res.status(200)
  res.end()
})

// const response = await MESG.emitEvent('request', {
//   headers: req.headers,
//   data: req.body,
// })
// res.send(response)

// listen for incoming requests
app.listen(43805, () => console.log('Example app listening on port 43805!'))