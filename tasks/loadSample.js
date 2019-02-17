const fs = require('fs')
const path = require('path')
const dataFilePath = path.join(__dirname, 'sampleZaps.json')

function loadCurrentZaps() {
  if (fs.existsSync(dataFilePath)) {
      return JSON.parse(fs.readFileSync(dataFilePath, { encoding: 'utf8' }))
  }

  return {}
}

function saveZaps(data) {
  if (fs.existsSync(dataFilePath)) {
      fs.unlinkSync(dataFilePath)
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(data), { encoding: 'utf8'})
}

function cacheZap(type, sample) {
  const zapdata = loadCurrentZaps()
  zapdata[type] = sample
  saveZaps(zapdata)
}

exports.pullSample = type => {

  if (!type) {
    console.log('no type returned from zapier', data)
    return
  }

  const samples = loadCurrentZaps()
  const sample = samples[type]

  return [{id: 'id_to_be_used_later', data: sample}]
}

const onGoingHooks = {}

exports.startTask = ({ triggerType, sampleData }, { success, error }) => {

  if (!triggerType) {
    error({ message: 'The Trigger Type is require' })
    return
  }

  if (!sampleData) {
    error({ message: 'You must provide the sample data' })
    return
  }

  cacheZap(triggerType, sampleData)
  success({ success: true, sampleData })

}
