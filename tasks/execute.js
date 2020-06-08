const axios = require('axios')
const captainHook = require('../zapier/captainHook')
const uuid = require('uuid/v1')
const fs = require('fs')
const path = require('path')
const dataFilePath = path.join(__dirname, 'currentZaps.json')

exports.receiveData = data => {

  if (!data || !data.id) {
    console.log('no data or id returned from zapier', data)
    return
  }

  // test ID
  if (data.id == 'id_to_be_used_later') {
    return
  }

  const liteflowCBs = onGoingHooks[data.id]

  if (!liteflowCBs) {
    console.log('no liteflowCB for id', data.id, onGoingHooks)
    return
  }

  delete onGoingHooks[data.id]
  delete data.id

  liteflowCBs.success({ outputs: data })
}

const onGoingHooks = {}

exports.startTask = ({ triggerType, data }, { success, error }) => {

  if (!triggerType) {
    error({ message: 'The Trigger Type is require' })
    return
  }

  // check to see if we have the webhook information
  const hook = captainHook.findHookForTrigger(triggerType)

  if (!hook) {
    error({ message: 'No matching hook found for type ' + triggerType })
    return
  }

  const uniqueId = uuid()

  axios({
    method: 'POST',
    url: hook.url,
    data: JSON.stringify({
      id: uniqueId,
      data
    })
  }).then(response => {
    onGoingHooks[uniqueId] = { success, error }
  }).catch(err => {
    error({ message: err })
  })
}
