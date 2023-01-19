const mysql = require('../database/mysql');
const queries = require('../database/queries');
const async = require('async');

let data = {};

function retrieveData(eachQ, callback) {
    mysql.query(queries[eachQ](), (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        data[eachQ] = result;
        callback();
    });
}

let statistics = {
    get_all_statistics: function(req, res, next) {
        data = {};
        let statistics_queries = [
            'get_average_delivery_time',
            'get_stats_more_than_5_pack',
            'get_stats_delivery_rate'
        ];

        async.each(statistics_queries, (eachQuery, callback) => {
            retrieveData(eachQuery, callback);
        }, (error) => {
            if (error) {
                res.json({id: 1, error: 'Failed to fetch data', result: null});
            } else {
                res.json({id: 1, error: null, result: data});
            }
        });
    }
}

module.exports = statistics;