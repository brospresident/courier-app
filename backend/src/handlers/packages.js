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

        mysql.query(queries[query](weight, cost, sender_email, receiver_email, date_added), (err, result) => {
            if (err) {
                console.log(err)
                res.json({id: 1, error: 'There was a problem adding the package.', result: null});
                return;
            }
            console.log(result);
            let newId = result.insertId;
            mysql.query(queries['insert_package_status'](newId), (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({id: 1, error: 'There was  a probleemmm ', result: null});
                    return;
                }
                res.json({id: 1, error: null, result: 'Package added with success!'});
            });
        });
    },

    load_packages: function(req, res, next) {
        let query = req.body.params.query;
        console.log(query);
        let driver_email = req.body.params.query;
        let queryCall = queries[query]();

        if (driver_email) {
            queryCall = queries[query](driver_email);
        }

        mysql.query(queryCall, (err, result) => {
            if (err) {
                console.log(err);
                res.json({id: 1, error: 'Problem fetching packages', result: null});
                return;
            }

            res.json({id: 1, error: null, result});
        });
    },

    delete_package: function(req, res, next) {
        let query = req.body.params.query;
        let package_id = req.body.params.package_id;
        mysql.query(queries['delete_package_status'](package_id), (err, result) => {
            if (err) {
                console.log(err);
                res.json({id: 1, error: 'Problem deleteing package', result: null});
                return;
            }

            mysql.query(queries[query](package_id), (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({id: 1, error: 'Problem deleting package', result: null});
                    return;
                }
    
                res.json({id: 1, error: null, result: 'ok'});
            });
        });

    }
}

module.exports = packages;