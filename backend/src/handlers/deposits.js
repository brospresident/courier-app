const mysql = require('../database/mysql');
const queries = require('../database/queries');

function getManagerByEmail(email, callback) {
    let query = 'select_employee';
    mysql.query(queries[query](email), (err, result) => {
        if (err) {
            callback && callback(err, null);
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

        getManagerByEmail(email, (err, _res) => {
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