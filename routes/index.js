/*Vista en formato JSON en \proy_xal\routes\index.js*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'Puerto Activo Url=http://hp:3000/'});
});

module.exports = router;
