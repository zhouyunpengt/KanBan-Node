const express = require('express');
const connection = require('../../libs/mysql.js');
const fs = require('fs');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    var project_name = req.body.CurrentSelection;
    var class_name = req.body.CurrentClickCategory;
    var title = req.body.title;
    var content = req.body.content;
    var img = req.body.img;

    if (img != '') {
      //随机文件名
      var img_name = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
      //过滤data:URL
      var base64Data = img.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFile('./public/content_images/' + img_name + '.png', dataBuffer, (err) => {
        if (err) {
          console.error(err);
        }
      });
      img = img_name + '.png';
    }
    //写入数据库
    connection.query(`INSERT INTO content (id,content_del,project_name,class_name,title,content,img) VALUES('${0}','n','${project_name}','${class_name}','${title}','${content}','${img}')`, (err) => {
      if (err) {
        console.error(err);
      } else {
        res.send('./content_images/' + img + '');
      }
    });
  });

  return router;
};