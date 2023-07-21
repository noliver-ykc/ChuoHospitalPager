const express = require('express');
const { signup: authSignup, login: authLogin } = require('../controllers/auth.ts');

const router = express.Router();

router.post('/signup', authSignup);
router.post('/login', authLogin);

module.exports = router;
