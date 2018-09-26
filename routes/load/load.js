const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

var record = [];

module.exports = function () {
  router.post('/', (req, res) => {
    if (req.body.getData == true) {
      connection.query(`SELECT * FROM project WHERE project_del = 'n'`, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          for (let i = 0; i < data.length; i++) {
            record.push({ cont: data[i].project_name, ar: [] });
          };
        };
      });

      connection.query(`SELECT * FROM class WHERE class_del = 'n'`, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < record.length; j++) {
              if (record[j].cont == data[i].project_name) {
                record[j].ar.push({ title: data[i].class_name, fenlei: [] })
              };
            };
          };
        };
      });

      connection.query(`SELECT * FROM content WHERE content_del = 'n'`, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < record.length; j++) {
              for (let k = 0; k < record[j].ar.length; k++) {
                if (record[j].ar[k].title == data[i].class_name && record[j].cont == data[i].project_name) {
                  record[j].ar[k].fenlei.push({ title: data[i].title, content: data[i].content, img: 'content_images/' + data[i].img, comments: [] });
                };
              };
            };
          };
        };
      });
      connection.query(`SELECT * FROM comment WHERE comment_del = 'n'`, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < record.length; j++) {
              for (let k = 0; k < record[j].ar.length; k++) {
                for (let l = 0; l < record[j].ar[k].fenlei.length; l++) {
                  if (record[j].ar[k].fenlei[l].title == data[i].title) {
                    record[j].ar[k].fenlei[l].comments.push({ user_name: data[i].username, comment: data[i].comment });
                  };
                }
              };
            };
          };
        };
        res.send(record);
        record = [];
      });
    };
  });
  return router;
};