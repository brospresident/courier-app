const mysql = require('../database/mysql');
const queries = require('../database/queries');
const utils = require('../utils');

let packages = {
    insert_package: function(req, res, next) {
        let query = req.body.params.query;
        let receiver_email = req.body.params.receiver_email;
        let sender_email = req.body.params.sender_email;
        let cost = req.body.params.cost;
        let date_added = req.body.params.date_added;
        let weight = req.body.params.weight;

        mysql.query(queries[query](weight, cost, sender_email, receiver_email, date_added), (err, res) => {
            if (err) {
                console.log(err)
                res.json({id: 1, error: 'There was a problem adding the package.', result: null});
                return;
            }

            res.json({id: 1, error: null, result: 'Package added with success!'});
        });
    }
}

module.exports = packages;