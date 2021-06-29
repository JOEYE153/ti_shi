const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { rejects } = require('assert')
const { resolve } = require('path')

/**
 * generate a token for each userid
 * @param {*} userid 
 * @returns 
 */
async function generateToken(userid) {
    const privateKey = await fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    let obj = {
        userid
    }
    const token = jwt.sign(obj, privateKey, {algorithm: 'RS256'})
    return token
}

/**
 * verify the token
 * and return the parsed userid
 */
async function verifyToken(token) {
    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
    // console.log(publicKey);
    // console.log(token);
    // console.log(jwt);
    let result;
    try {
        result = jwt.verify(token, publicKey)
    } catch (e) {
        // console.log(e);
        result = 'err'
    }
    return result
}

exports.generateToken = generateToken
exports.verifyToken = verifyToken