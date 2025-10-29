const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorData.controller');

router.post('/', sensorController.createSensorData);

router.get('/', sensorController.getAllSensorData);

router.get('/:id', sensorController.getSensorDataById);

router.put('/:id', sensorController.updateSensorData);

router.delete('/:id', sensorController.deleteSensorData);

module.exports = router;