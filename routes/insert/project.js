const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project_name = req.body.name;
    var project_id = req.body.projectId;
    var project_length = req.body.len;
    connection.query(`INSERT INTO project (id,project_del,project_name,project_id,project_length) VALUES('${0}','n','${project_name}','${project_id}','${project_length}')`, (err) => {
      if (err) {
        console.error(err);
      }
    });

  });
  return router;
};