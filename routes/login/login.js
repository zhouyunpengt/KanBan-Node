const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {

  router.post('/', (req, res) => {
    var username = req.body.user;
    var password = req.body.password;
    connection.query(`SELECT * FROM login WHERE username='${username}'`, (err, data) => {
      if (err) {
        console.error(err);
        res.send({ login: 'error' });
      } else {
        //识别用户名在数据库里是否存在
        if (data == '' && data != /[\u4e00-\u9FA5]+/) {
          //账户不存在
          res.send({ login: 'accountNull' });
        } else {
          //密码错误
          if (password != data[0].password) {
            res.send({ login: 'passwordWrong' })
          } else {
            //登录成功
            req.session.user = data[0].username;
            req.session.admin = data[0].admin;
            res.send({ login: data[0].admin, img: 'user_images/' + data[0].user_images });
          }

        };
      };
    });
  });
  return router;
};