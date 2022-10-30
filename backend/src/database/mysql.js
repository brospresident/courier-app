const mysql = require('mysql');

const DB_DATA = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'courier_app'
}

let connection;

function connectMysql(callback) {
    if (connection && connection.ok) {
        callback && callback(null, 'ok');
        return;
    }
    connection = mysql.createPool(DB_DATA);
    connection.getConnection((err) => {
        if (err) {
            console.log(`MySQL connection failed...`)
            callback && callback(err, null);
            return;
        } else {
            connection.ok = true;
            console.log(`MySQL connected at ${new Date()}.`)
            callback && callback(null, 'ok');
            return;
        }
    });
}

function query(params, callback) {
    if (!connection.ok) return {err: 'Mysql not connected!'};
    
    connection.query(params, (err, result) => {
        if (err) {
            callback && callback(err, null);
        } else {
            callback && callback(null, result);
        }
    });
}

module.exports = {
    connectMysql,
    query
}
