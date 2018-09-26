const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project_name = req.body.projectName;
    var class_name = req.body.classify;
    var title = req.body.title;
    var username = req.body.user_name;
    var comment = req.body.content;

    connection.query(`INSERT INTO comment (id,comment_del,project_name,class_name,title,username,comment) VALUES('${0}','n','${project_name}','${class_name}','${title}','${username}','${comment}')`, (err) => {
      if (err) {
        console.error(err);
        res.send(true);
      } else {
        res.send(false);
      };
    });
  });
  return router;
};