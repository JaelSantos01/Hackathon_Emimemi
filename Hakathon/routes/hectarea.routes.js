const express = require('express');
const router = express.Router();
const hectareaController = require('../controllers/hectarea.controller');

// /api/campos/:campoId/hectareas
router.post('/', hectareaController.createHectarea);

router.get('/', hectareaController.getAllHectareas);

router.get('/:id', hectareaController.getHectareaById);

router.put('/:id', hectareaController.updateHectarea);

router.delete('/:id', hectareaController.deleteHectarea);

module.exports = router;