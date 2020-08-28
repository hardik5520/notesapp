const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/user-controller');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { check } =require('express-validator');

//apicalls--------
router.get('/', usersControllers.getUsers);

router.post('/signup',
[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
],
usersControllers.signup);

router.post('/login', usersControllers.login);

//--------apicalls

module.exports = router;