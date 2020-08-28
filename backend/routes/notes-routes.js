const express = require('express');
const router = express.Router();
const notesControllers = require('../controllers/notes-controller');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { check }=require("express-validator");


//api--------

router.get('/viewAll', notesControllers.viewAll);
router.get('/:uid', notesControllers.notesById);
router.get('/user/:uname', notesControllers.getnotebyname);

router.post('/',
[
        check('title').not().isEmpty(),
        check('descreption').isLength({min: 5}),
        check('creatorname').not().isEmpty()
],
notesControllers.createNote);

router.patch('/:uid',[check('title').not().isEmpty(),
check('descreption').isLength({min: 5})
], notesControllers.updateNote);

router.delete('/:uid', notesControllers.deleteNote);
//------------api

module.exports=router;