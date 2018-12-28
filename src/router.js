const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const notesController = require('./server/controllers/notes')
const indexController = require('./server/controllers/index')

const router = express()
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(express.static(path.join(__dirname, 'client/build')));

router.get('/', indexController.client);
router.post('/notes', notesController.createNote);
router.get('/notes', notesController.listNotes);

module.exports = router