const bcrypt = require('bcryptjs')

async function encrypt(password) {
    let result = bcrypt.hashSync(password, 10);
    return result;
}

async function decrypt(password, encryptPassword) {
    let result = bcrypt.compareSync(password, encryptPassword);
    return result;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;