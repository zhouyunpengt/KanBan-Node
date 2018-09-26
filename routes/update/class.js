const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project = req.body.projectName;
    var classOne = req.body.originalClassify;
    var classTwo = req.body.targetClassify;
    var classThree = '';

    connection.query(`UPDATE class SET class_name = '${classThree}' WHERE project_name = '${project}' AND class_name = '${classOne}'`, (err, data) => {
      if (err) {
        console.error(err);
      }
    });

    connection.query(`UPDATE class SET class_name = '${classOne}' WHERE project_name = '${project}' AND class_name = '${classTwo}'`, (err, data) => {
      if (err) {
        console.error(err);
      }
    });

    connection.query(`UPDATE class SET class_name = '${classTwo}' WHERE project_name = '${project}' AND class_name = '${classThree}'`, (err, data) => {
      if (err) {
        console.error(err);
      }else{
        res.send(true);
      }
    });
  });
  return router;
};