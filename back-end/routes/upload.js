let express = require('express');
var moment = require('moment');
let fs = require('fs');
let axios = require('axios');
let FormData = require('form-data');
let formidable = require('formidable');
let uploadRouter = express.Router();

const sqlQuery = require('../module/mysql');
const resBody = require('../module/res');

const Authorization = [
    'DgXQmoY74lzWNR1FJSBXgcGerv4M61Kf',
    'wKhetOJZpQIaQ2Rbe3UaRRfE5tUrYWBY',
    '3Rtq37xzstxSbQukpir415LuRQJmrwoY',
    'Is6sxG5wvsiRlug06FLJLKvMevbVMO1I',
    '2gxzFFO3ul5ygV6uxFiCZZ0MU3WGQSPl',
    '55QKVi5Ob8JdsqxhylhFhMkQZjYYKD6t',
    'lMrj9BzcoIJUoj0TSv5KzKVtn9blYBwd',
    '0ETe8O2UOiPfpnGVdEnmW9nzvzTYFuPn',
    'pZrS8hIoZwXphqDgMR8fxAftfkgUKGKU',
    'UE9LamHyAGGXGUBZmMkjCuRYUaRYAfdy',
    'txrUKGqK6708PlwbQS3rZmZp962RcquR',
    'ShcqHPPUPdqGcONFIaCitJFRFmrFAG80',
    'GoSOdKYa3wRTK3hbEZfGOn9eDSdofBpe',
    'likfv9hSsbDFW0hPY1Y86dVdCYUT1EYY',
    'KTKWUQRaTtjbtSZ8JEsllF1rPAbjkX80',
]

// uploadRouter.post('/avatar', async function(req, res, next) {
//     // TODO token
//     console.log(req.body);
//     console.log('---------------------');
//     console.log(req);
//     let userId = req.body.userid;
//     try {
//         let imgUrl = '';
//         // try 3 times at most
//         for (let i = 0; i < 3; i++) {
//             let imgRep = await uploadImage(req.body.avatar);
//             if (imgRep['success']) {
//                 imgUrl = imgRep['data']['url'];
//                 break;
//             } else {
//                 if (imgRep['images'] == undefined) {
//                     continue;
//                 } else {
//                     imgUrl = imgRep['images'];
//                     break;
//                 }
//             }
//         }
//         if (imgUrl == '') {
//             // fail
//             res.json(resBody({}, 0, 'fail'));
//         } else {
//             // success
//             let sql = "update users_info set avatar = ? where user_id = ?";
//             await sqlQuery(sql, [imgUrl, userId]);
//             res.json(resBody({}, 1, 'success'));
//         }
//         console.log(imgUrl);
//     } catch (e) {
//         console.log(e);
//     }
// });

// async function uploadImage(imgData) {
//     let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//     let dataBuffer = Buffer.from(base64Data, 'base64');
//     let imgPath = "routes/temp_imgs/" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".png"
//     await fs.writeFile(imgPath, dataBuffer, function(err){});
//     let form = new FormData();
//     form.append("smfile", fs.createReadStream(imgPath));
//     let headers = form.getHeaders();
//     headers['user-agent'] = 'node.js';
//     // TODO
//     headers['Authorization'] = Authorization[Math.floor(Math.random() * 7)];
//     // console.log(headers['Authorization']);
//     let r = await axios({
//         method: "post",
//         url: "https://sm.ms/api/v2/upload",
//         headers: headers,
//         data: form
//     });
//     // fs.unlink(imgPath, function(err){});
//     return r.data;
// }

uploadRouter.post('/avatar', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    // TODO token
    let userId = req.body.userid;
    try {
        const form = new formidable.IncomingForm();
        form.maxFieldsSize = 100 * 1024;
        form.keepExtensions = true;
        form.parse(req, async function(err, fields, file) {
            if (err) {
                throw err;
            }
            // console.log(file);
            let imgPath = file.file.path;
            let imgUrl = '';
            // try 3 times at most
            for (let i = 0; i < 3; i++) {
                let imgRep = await uploadImage(imgPath);
                if (imgRep['success']) {
                    imgUrl = imgRep['data']['url'];
                    break;
                } else {
                    if (imgRep['images'] == undefined) {
                        continue;
                    } else {
                        imgUrl = imgRep['images'];
                        break;
                    }
                }
            }
            if (imgUrl == '') {
                // fail
                res.json(resBody({}, 0, 'fail'));
            } else {
                // success
                let sql = "update users_info set avatar = ? where user_id = ?";
                await sqlQuery(sql, [imgUrl, userId]);
                res.json(resBody({}, 1, 'success'));
            }
            console.log(imgUrl);
        })
    } catch (e) {
        console.log(e);
    }
});

async function uploadImage(imgPath) {
    let form = new FormData();
    form.append("smfile", fs.createReadStream(imgPath));
    let headers = form.getHeaders();
    headers['user-agent'] = 'node.js';
    // TODO
    headers['Authorization'] = Authorization[Math.floor(Math.random() * 15)];
    // console.log(headers['Authorization']);
    let r = await axios({
        method: "post",
        url: "https://sm.ms/api/v2/upload",
        headers: headers,
        data: form
    });
    // fs.unlink(imgPath, function(err){});
    return r.data;
}

module.exports = uploadRouter;