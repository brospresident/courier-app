const mysql = require('../database/mysql');
const queries = require('../database/queries');
const utils = require('../utils');

let deposits = {
    get_all_deposits: function(req, res, next) {
        let query = req.body.params.query;

        mysql.query(queries[query](), (err, result) => {
            if (err) {
                res.json({id: 1, error: 'problem getting deposits', result: null});
                return;
            }
            res.json({id: 1, error: null, result: result}); 
        });
    },

    insert_deposit: function(req, res, next) {
        console.log(req.body.params);
        let {x_pos, y_pos, email, schedule_start, schedule_end, query} = req.body.params;

        utils.getEmployeeByEmail(email, (err, _res) => {
            if (err) {
                res.json({id: 1, error: 'this employee does not exist', result: null});
                return;
            }
            mysql.query(queries[query](x_pos, y_pos, email, schedule_start, schedule_end), (error, result) => {
                if (error) {
                    console.log(error);
                    res.json({id: 1, error: 'could not add new office', result: null});
                    return;
                }
                res.json({id: 1, error: null, result: 'ok'});
            });
        });
    }
}

module.exports = deposits;