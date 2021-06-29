const fs = require('fs')
const path = require('path')

async function allocateUserid() {
    let data = Number(await fs.readFileSync(path.join(__dirname, '../keys/userid.txt')));
    data += 1;
    try {
        await fs.writeFileSync(path.join(__dirname, '../keys/userid.txt'), String(data));
        return data;
    } catch (err) {
        // console.log(err);
        return 0;
    }
}

module.exports = allocateUserid;