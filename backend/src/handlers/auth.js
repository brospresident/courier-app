const bcrypt = require('bcrypt');
const mysql = require('../database/mysql');
const queries = require('../database/queries');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

function encryptPassword(password, callback) {
    bcrypt.hash(password, 10, (err, encryptedPassword) => {
        if (err) callback(err, null);
        else callback(null, encryptedPassword);
    });
}

function comparePassword(password, db_res, callback) {
    bcrypt.compare(password, db_res, (err, same) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, same);
        }
    });
}

function generateClientCode() {
    return crypto.randomBytes(10).toString('hex').substring(0, 10);
}

let auth = {
    register: function(req, res, next) {
        let first_name = req.body.params.first_name;
        let last_name = req.body.params.last_name;
        let email = req.body.params.email;
        let password = req.body.params.password;
        let query = req.body.params.query;

        encryptPassword(password, (err, pass) => {
            if (err) {
                res.json({id: 1, error: err, result: null});
            } else {
                let client_code = generateClientCode();
                let q = queries[query](first_name, last_name, email, pass, client_code);
                mysql.query(q, (err, result) => {
                    if (err) {
                        res.json({id: 1, error: 'mysql insert error', result: null});
                    } else {
                        let r = {
                            email: email,
                            role: 'client'
                        };
                        jwt.sign(r, 'JWTSecretKeyForCourierApp', (err, encoded) => {
                            console.log(encoded);
                            r.encoded = encoded;
                            res.json({id: 1, error: null, result: r});
                        });
                    }
                });
            }
        });
    },

    login: function(req, res, next) {
        let email = req.body.params.email;
        let password = req.body.params.password;
        let query = req.body.params.query;

        mysql.query(queries[query](email), (err, result) => {
            result = result[0];
            comparePassword(password, result.password, (err, same) => {
                if (err) {
                    res.json({id: 1, error: 'error pass user 1', result: null});
                } else {
                    if (!same) {
                        res.json({id: 1, error: 'error pass user 2', result: null});
                        return;
                    }
                    let r = {
                        email: result.email
                    };
                    if (result.role) {
                        r.role = result.role;
                    } else {
                        r.role = 'client';
                    }
                    jwt.sign(r, "JWTSecretKeyForCourierApp", (err, encoded) => {
                        r.encoded = encoded;
                        res.json({id: 1, error: null, result: r});
                    });
                }
            });
        });
    }
}

module.exports = auth;