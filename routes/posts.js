const express = require('express');
const router = express.Router();
const passsport = require('passport');

const postController = require('../controllers/posts_controller');

router.post('/create', passsport.checkAuthentication, postController.create);

module.exports = router