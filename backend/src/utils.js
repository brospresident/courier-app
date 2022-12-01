const axios = require('axios');
const bcrypt = require('bcrypt');
const mysql = require('./database/mysql');
const queries = require('./database/queries');
const __API_ADDR = 'http://localhost:6001/api';

module.exports = {
    call_backend: function(method, params, cb, cberr, cbfin) {
        let data = {
            id: 1,
            method: method,
            params: params
        };
        axios.post(__API_ADDR, data , {maxContentLength: Infinity, maxBodyLength: Infinity})
            .then(function (response) {
                cb && cb(response.data);
            })
            .catch(function (error) {
                cberr && cberr(error);
            })
            .then(function () {
                cbfin && cbfin();
            });  
    },
    
    encryptPassword: function(password, callback) {
        bcrypt.hash(password, 10, (err, encryptedPassword) => {
            if (err) callback(err, null);
            else callback(null, encryptedPassword);
        });
    },

    getEmployeeByEmail(email, callback) {
        let query = 'select_employee';
        let q = queries[query](email);
        mysql.query(q, (err, result) => {
            if (err) {
                callback && callback(err, null);
                return;
            }

            if (result.length == 0) {
                callback && callback('there is no employee with that email', null);
                return;
            }

            result = result[0];
            if (result.email == email) {
                callback(null, result);
            } else {
                callback('not found', null);
            }
        });
    }
}