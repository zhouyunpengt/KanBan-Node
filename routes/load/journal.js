const express = require('express');
const connection = require('../../libs/mysql.js');
const router = express.Router();

var record = [];

module.exports = function () {
  router.post('/', (req, res) => {
    console.log(req.body)
    for (let i = 0; i < 7; i++) {
      var myDate = new Date();
      myDate = new Date(myDate.getTime() - (i * 24 * 60 * 60 * 1000));
      Y = myDate.getFullYear() + '-';
      M = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-';
      D = (myDate.getDate() < 10 ? '0' + (myDate.getDate()) : myDate.getDate()) + '';
      myDate = Y + M + D;


      var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var dateStr = new Date(Date.parse(myDate.replace(/-/g, "/")));
      dateStr = weekDay[dateStr.getDay()];


      var dateWeek = myDate.replace('2018-', '');
      dateWeek = dateWeek.replace(/^[0]+/, '');
      dateWeek = dateWeek.replace('-', '月');
      dateWeek = dateWeek + '日' + ' ' + dateStr;
      console.log(myDate)

      record.push({ date: dateWeek, myDate: myDate, caozuo: [] });
    };

    connection.query(`SELECT * FROM journal`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < 7; j++) {
            if (data[i].date == record[j].myDate) {
              record[j].caozuo.push({ time: data[i].time, user: data[i].username, cardTitle: data[i].title, oldClassify: data[i].from_class, newClassify: data[i].to_class });
            }
          }
        };
      };
      res.send(record);;
      record = [];
    })
  });
  return router;
};