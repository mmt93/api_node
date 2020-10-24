var express = require('express');
var router = express.Router();

var voipController = require('../controllers/controller');

router.get('/', voipController.getCampanha)

module.exports = router;