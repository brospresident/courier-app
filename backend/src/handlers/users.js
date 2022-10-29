const mysql = require('../mysql');
const queries = require('../queries');

let users = {
    get_user: function(req, res, next) {
        let email = req.body.params.email;
        let query = req.body.params.query;

        mysql.query(queries[query](email), (err, result) => {
            if (err) {
                res.json({id: 1, error: err, result: null});
                return;
            }
            result = result[0];
            res.json({id: 1, error: null, result: result});
        })
    }
}

module.exports = users;