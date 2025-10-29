const express = require('express');
const router = express.Router();
const campoController = require('../controllers/campo.controller');

router.post('/', campoController.createCampo);

router.get('/', campoController.getAllCampos);


router.get('/:id', campoController.getCampoById); 

router.put('/:id', campoController.updateCampo);

router.delete('/:id', campoController.deleteCampo);

module.exports = router;