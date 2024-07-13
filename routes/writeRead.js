'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/users', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest('hex');
    
    connection.execute(`INSERT INTO student_tbl 
     (first_name, last_name, password, email, phone, faculty, program, year_of_study, sex, created_at, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
     [req.body.first_name, req.body.last_name, mypass, req.body.email, req.body.phone, req.body.faculty, req.body.program,
      req.body.year_of_study, req.body.sex, new Date(), new Date()])
        .then(() => {
            console.log('Insert Successful!');
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            console.log('Insert Fail!');
            res.sendStatus(500); // Send error status code
        });
});

//-----------------------------read--------------------------------------
wrRoute.get('/users', function (req, res, next) {
    connection.execute(`SELECT * FROM student_tbl;`)
        .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.log(err);
            console.log('No Data!');
        });
});
wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    
    connection.execute(`SELECT * FROM student_tbl WHERE password=?;`,
    [mypass])
    
    .then((result) => {
        var data = result[0];
        console.log(data);
        if (data.length === 0) {
           res.sendStatus(400);
        } else {
           res.sendStatus(200);
        }
     }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
     });
 
 });
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;
