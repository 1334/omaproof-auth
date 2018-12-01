const express = require('express');
const router = express.Router();

router
  // eslint-disable-next-line no-console
  .post('/addUser', () => console.log('addUser'))
  // eslint-disable-next-line no-console
  .get('/authprocess', () => console.log('authprocess'));
module.exports = router;
