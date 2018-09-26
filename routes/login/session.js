const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    if (req.session.user != undefined) {
      connection.query(`SELECT * FROM login WHERE username='${req.session.user}'`, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          res.send({ user: data[0].username, login: data[0].admin, img: 'user_images/' + data[0].user_images });
        }
      })
    } else {
      res.send('0');
    }
  });
  return router;
};