const express = require('express');
const { createUser, loginUser } = require('../controller/auth.controller');

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/login', loginUser);

module.exports = router;
