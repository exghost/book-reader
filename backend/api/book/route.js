const express = require('express');
const router = express.Router();


const controller = require('./controller');
const middleware = require('./middleware');

router.get('/', controller.fetchAllBooks);
router.get('/:bookId', controller.fetchBook);
router.post('/', middleware.upload.any(), controller.createBook);

module.exports = router;