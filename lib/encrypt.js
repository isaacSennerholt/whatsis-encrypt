const crypto = require('crypto')

function cipher(key, data) {
  const nonce = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce)
  const cipherData = cipher.update(data)

  cipher.final()

  const tag = cipher.getAuthTag()

  return { nonce, tag, cipherData }
}

function decipher(key, nonce, tag, cipherData) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce)
  decipher.setAuthTag(tag)
  const decipherData = decipher.update(cipherData)

  try {
    decipher.final()
  } catch (error) {
    console.error('Failed to decipher data', error)
    return
  }

  return decipherData
}

module.exports = {
  cipher,
  decipher
}
