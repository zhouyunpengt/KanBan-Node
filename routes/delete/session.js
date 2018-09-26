const express = require('express');
const router = express.Router();

module.exports = function () {
  router.post('/', (req, res) => {
    if (req.session.user != undefined) {
      delete req.session;
    }
  });
  return router;
};