const express = require('express');
const connection = require('../../libs/mysql.js');
const fs = require('fs');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project_name = req.body.projectName;
    var class_name = req.body.classify;

    connection.query(`UPDATE class SET class_del = 'y' WHERE project_name = '${project_name}' AND class_name = '${class_name}'`, (err) => {
      if (err) {
        console.error(err);
      };
    });

    connection.query(`DELETE FROM content WHERE project_name = '${project_name}' AND class_name = '${class_name}'`, (err) => {
      if (err) {
        console.error(err);
      };
    });

    connection.query(`DELETE FROM comment WHERE project_name = '${project_name}' AND class_name = '${class_name}'`, (err) => {
      if (err) {
        console.error(err);
      };
    });
    res.send(true);
  });
  return router;
};