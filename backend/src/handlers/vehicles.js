const mysql = require('../database/mysql');
const queries = require('../database/queries');
const utils = require('../utils');

let vehicles = {
    get_all_vehicles(req, res, next) {
        let query = req.body.params.query;
        mysql.query(queries[query](), (error, result) => {
            if (error) {
                res.json({id: 1, error: error, result: null});
                return;
            }

            for (const veh of result) {
                veh.number_plate = `${veh.county} ${veh.numbers} ${veh.alpha_characters}`;
            }
            res.json({id: 1, error: null, result: result});
        }); 
    },

    save_vehicle(req, res, next) {
        console.log(req.body.params);
        let query = req.body.params.query;
        let email = req.body.params.driver_email;
        let model = req.body.params.model;
        let county = req.body.params.county;
        let number = req.body.params.number;
        let chars = req.body.params.chars;

        utils.getEmployeeByEmail(email, (error, employee) => {
            if (error) {
                res.json({id: 1, error: error, result: null});
                return;
            }

            if (employee) {
                mysql.query(queries[query](email, model, county, number, chars), (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({id: 1, error: 'Problem adding vehicle!', result: null});
                        return;
                    }

                    res.json({id: 1, error: null, result: 'Vehicle added!'});
                });
            }
        });
    }
}

module.exports = vehicles;
