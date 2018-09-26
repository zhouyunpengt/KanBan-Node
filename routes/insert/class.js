const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project_name = req.body.CurrentSelection;
    var class_name = req.body.classifyName;

    connection.query(`INSERT INTO class (id,class_del,project_name,class_name) VALUES('${0}','n','${project_name}','${class_name}')`, (err) => {
      if (err) {
        console.error(err);
        res.send(false);
      } else {
        res.send(true);
      };
    });
  });
  return router;
};