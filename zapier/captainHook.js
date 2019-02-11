const fs = require('fs')
const uuid = require('uuid/v1')

exports.saveHook = hook => {
    // generate unique ID
    const id = uuid()

    return id
}

exports.deleteHook = hook => {

}
