const mysql = require('../database/mysql');
const queries = require('../database/queries');

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
        });
    },

    update_client: function(req, res, next) {
        let {email, phone_number, city, zip_code, street, street_number, county, query} = req.body.params;

        mysql.query(queries[query](email, phone_number, city, zip_code, street, street_number, county), (err, result) => {
            if (err) {
                console.log(err);
                res.json({id: 1, error: 'There was a problem saving your data!', result: null});
                return;
            }
            let message = 'Data saved successfully!';
            res.json({id: 1, error: null, result: {message: message}});
        });
    },

    get_all_employees: function(req, res, next) {
        let query = req.body.params.query;
        mysql.query(queries[query](), (err, result) => {
            if (err) {
                res.json({id: 1, error: 'error while getting employees', result: null});
                return;
            }
            res.json({id: 1, error: null, result: result});
        });
    }
}

module.exports = users;