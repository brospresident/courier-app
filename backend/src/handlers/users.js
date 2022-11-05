const mysql = require('../database/mysql');
const queries = require('../database/queries');
const bcrypt = require('bcrypt');
const utils = require('../utils');

function encryptPassword(password, callback) {
    bcrypt.hash(password, 10, (err, encryptedPassword) => {
        if (err) callback(err, null);
        else callback(null, encryptedPassword);
    });
}

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
    },

    add_employee: function(req, res, next) {
        let {first_name, last_name, email, phone_number, city, county, zip_code, 
            password, street, wage, role, street_number, query, ssn} = req.body.params;
        // console.log(query);
        encryptPassword(password, (err, encryptedPassword) => {
            if (err) {
                res.json({id: 1, error: 'problem encrypting', result: null});
            }
            mysql.query(queries[query](first_name, last_name, email, phone_number, city, county, zip_code, encryptedPassword, street, wage, role, street_number, ssn),
                (err, result) => {
                   if (err) {
                    console.log(err);
                    res.json({id: 1, error: 'There was a problem adding a new employee', result: null});
                    return;
                   } 
                   let message = 'Employee added!';
                   res.json({id: 1, error: null, result: {message: message}});
                });
        });
    },

    update_employee: function(req, res, next) {
        let {first_name, last_name, email, phone_number, city, county, zip_code, 
            street, wage, role, street_number, query, ssn} = req.body.params;

        mysql.query(queries[query](first_name, last_name, email, phone_number, city, county, zip_code, street, wage, role, street_number, ssn), (err, result) => {
            if (err) {
                console.log(err);
                res.json({id: 1, error: 'problem updating', result: null});
                return;
            }
            let message = 'Updated!';
            res.json({id: 1, error: null, result: {message: message}});
        });
    }
}

module.exports = users;