const express = require('express');
const router = express.Router();

const controller = require('../controllers/coment.controller');

// Prefijo: /coment

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
