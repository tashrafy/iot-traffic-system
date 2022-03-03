var express = require('express');
var controller = require('./hue.controller');

var router = express.Router();

router.get('/lights', controller.getAll);
router.post('/modify_state', controller.modifyState);

module.exports = router;
