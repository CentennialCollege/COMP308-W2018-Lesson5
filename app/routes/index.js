let express = require('express');
let router = express.Router();


// need a require statement

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

module.exports = router;
