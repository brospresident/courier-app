const mysql = require('../database/mysql');
const queries = require('../database/queries');

let vehicles = {
    get_all_vehicles(req, res, next) {
        let query = req.body.params.query;
        mysql.query(queries[query](), (error, result) => {
            if (error) {
                res.json({id: 1, error: error, result: null});
                return;
            }

            res.json({id: 1, error: null, result: result});
        }); 
    }
}

module.exports = vehicles;