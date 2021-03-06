/*
 * Copyright (c) 2015 TechnologyAdvice
 */

/**
 * Compiles array items into string error messages
 * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} msgObjs Original array
 * of error message objects
 * @returns {Array<string>}
 */
const getMessages = (msgObjs) => {
  const messages = []
  msgObjs.forEach(obj => {
    messages.push((obj.key ? `${obj.key} (${obj.value}):` : `${obj.value}:`) + ` ${obj.message}`)
  })
  return messages
}

/**
 * Creates ValidationError object for throwing
 * @param {Array<{type: string, sub: string|number, key: string, value: *, message: string}>} message Raw array of
 * error objects
 */
function ValidationError(message) {
  Object.defineProperty(this, 'name', { value: 'ValidationError' })
  Object.defineProperty(this, 'message', { value: getMessages(message).join('\n') })
  Object.defineProperty(this, 'collection', { value: message })
  Error.captureStackTrace(this, this.name)
}

// Creates instance of ValidationError as Error object
ValidationError.prototype = Object.create(Error.prototype)
ValidationError.prototype.constructor = ValidationError

export default ValidationError
