const axios = require('axios');

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
    }
}