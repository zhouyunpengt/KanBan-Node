const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var title = req.body.DragAndDropTitle;
    var new_class = req.body.placeTheTitle;
    var project = req.body.nowClassify;

    connection.query(`UPDATE content SET class_name='${new_class}' WHERE project_name='${project}' AND title='${title}'`, (err) => {
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