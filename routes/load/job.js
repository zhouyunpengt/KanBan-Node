const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var username = req.body.username;
    if (username != undefined && username != '') {
      connection.query(`SELECT job FROM login WHERE username = '${username}'`, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          res.send(data[0].job);
        }
      });
    };
  });
  return router;
};