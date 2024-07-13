'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/users/:uid', function (req, res, next) {
    connection.execute(`UPDATE student_tbl SET first_name=?, last_name=?, phone=?, updated_at=? WHERE student_id=?;`,
    [req.body.first_name, req.body.last_name, req.body.phone, Date.now(), req.params.uid])
    .then(() => {
        console.log('Update Successfully!');
    }).catch((err) => {
        console.log(err);
    });
      res.status(200).send('Update Successfully!');
 });

//------------------------------------delete---------------------------------------------
udRoute.delete('/users/:uid', function (req, res, next) {
    connection.execute("DELETE FROM student_tbl WHERE student_id=?;",
     [req.params.uid])
    .then(() => {
        console.log('Delete Successfully!');
    }).catch((err) => {
        console.log(err);
    });
      res.end();
 });
 
udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
})
 module.exports = udRoute;