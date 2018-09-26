const express = require('express');
const connection = require('../../libs/mysql.js');
const fs = require('fs');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var img = req.body.imgSrc;
    var username = req.body.username;

    connection.query(`SELECT user_images FROM login WHERE username = '${username}'`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        if (data[0].user_images != '') {
          fs.unlink('./public/user_images/' + data[0].user_images, (err) => {
            if (err) {
              console.error(err);
            };
          });
        };
      };
    });

    //随机文件名
    var img_name = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    //过滤data:URL
    var base64Data = img.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile('./public/user_images/' + img_name + '.png', dataBuffer, (err) => {
      if (err) {
        console.error(err);
      }
    });
    img = img_name + '.png';

    connection.query(`UPDATE login SET user_images='${img}' WHERE username='${username}'`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.send('user_images/' + img)
  });
  return router;
};