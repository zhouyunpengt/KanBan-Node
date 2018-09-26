const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var date = req.body.date;
    var time = req.body.time;
    var time_stamp = req.body.timestamp;
    var username = req.body.user;
    var title = req.body.cardTitle;
    var from_class = req.body.oldClassify;
    var to_class = req.body.newClassify;

    connection.query(`INSERT INTO journal (id,date,time,time_stamp,username,title,from_class,to_class) VALUES ('${0}','${date}','${time}','${time_stamp}','${username}','${title}','${from_class}','${to_class}')`, (err) => {
      if (err) {
        console.error(err);
      }
    })
  });
  return router;
};