const express = require('express');
const connection = require('../../libs/mysql.js');
const fs = require('fs');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project_name = req.body.projectName;
    var class_name = req.body.title;
    var title = req.body.childTitle;

    connection.query(`UPDATE content SET content_del = 'y' WHERE project_name = '${project_name}' AND class_name = '${class_name}' AND title = '${title}'`, (err) => {
      if (err) {
        console.error(err);
      };
    });

    connection.query(`UPDATE comment SET comment_del = 'y' WHERE project_name = '${project_name}' AND class_name = '${class_name}' AND title = '${title}'`, (err) => {
      if (err) {
        console.error(err);
      };
    });
  });
  return router;
};