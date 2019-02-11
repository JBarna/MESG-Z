const axios = require('axios')
const fs = require('fs')
const uuidv1 = require('uuid/v1');
// uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

function triggerZapier() {

}

function loadWebHookData() {
  try {
    return JSON.parse(fs.readFileSync('./zapier/hookdata.json', { encoding: 'utf8' }))
  } catch {
    return []
  }
}

function saveRequestState(uuid) {
  const loadExistingStates = () => {
    try {
      return JSON.parse(fs.readFileSync('./zapier/current.json', { encoding: 'utf8' }))
    } catch {
      return []
    }
  }

  const states = loadExistingStates()
  states.push({
    zapierRequestId: uuid,

  })
}

module.exports = ({ triggerType, data }, { success, error }) => {

  // check to see if we have the webhook information
  const data = loadWebHookData()

  const hook = data.triggers.find(hook => hook.type == triggerType)

  if (!hook) {
    error({ message: 'No matching hook found for type ' + triggerType })
    return
  }

  const requestId = uuidv1()
  

  axios({
    method: 'POST',
    url: hook.url,
    data: JSON.stringify({
      id: requestId,
      ...data
    })
  })
}
