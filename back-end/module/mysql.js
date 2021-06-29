const mysql = require("mysql");

const options = {
    host:"81.70.240.165",
    user:"tishi",
    password:"tishi20210412",
    database:"tishi",
    timezone: "08:00"
}

var pool = mysql.createPool(options);

var query = (sqlStr,params)=>{
    // console.log(sqlStr);
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if (err) {
                throw err;
            } else {
                connection.query(sqlStr,params,(error,results)=>{
                
                    connection.release();
                    if(error){
                        reject(error);
                    }else{
                        resolve(results);
                    }
                })
            }
        })       
    })
}

module.exports = query