const fs = require('fs')
const path = require('path')
const dataFilePath = path.join(__dirname, 'hookdata.json')

function loadHookData() {
    if (fs.existsSync(dataFilePath)) {
        return JSON.parse(fs.readFileSync(dataFilePath, { encoding: 'utf8' }))
    } 

    return {}
}

function saveDataToFile(data) {
    if (fs.existsSync(dataFilePath)) {
        fs.unlinkSync(dataFilePath)
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data), { encoding: 'utf8'})
}

exports.saveHook = hook => {

    const hookData = loadHookData()

    hookData[hook.zap_id] = hook
    saveDataToFile(hookData)

    return hook.zap_id
}

exports.deleteHook = hookId => {
    const hookData = loadHookData()
    delete hookData[hookId]

    saveDataToFile(hookData)
}

exports.findHookForTrigger = triggerType => {
    const hookData = loadHookData()

    for (const zapId in hookData) {
        const hook = hookData[zapId]
        if (hook.type == triggerType)
            return hook
    }
}

