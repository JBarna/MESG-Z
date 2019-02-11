const MESG = require('mesg-js').service()
const axios = require('axios')
const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')

const fs = require('fs')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/hooks', async (req, res) => {

  // handle incoming hook
  const body = req.body

  // save the zap id and url
  console.log('this is the subscribe', body)

  fs.writeFileSync('./zapier/data.json', JSON.stringify(body))

  res.send(JSON.stringify(body))
  res.end()
})

app.delete('/api/hooks/{hookId}', async (req, res) => {

  // handle incoming hook
  const hookId = req.params.hookId

  // save the zap id and url
  console.log('this is the unsubscribe', hookId)
  res.end()
})

// const response = await MESG.emitEvent('request', {
//   headers: req.headers,
//   data: req.body,
// })
// res.send(response)

app.listen(43805, () => console.log('Example app listening on port 3000!'))