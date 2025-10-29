const { SensorData, Hectarea } = require('../models');

// [C]REATE
exports.createSensorData = async (req, res) => {
    try {
        const { sensorId, co2, humidity, luminosity, HectareaId } = req.body;

        const hectarea = await Hectarea.findByPk(HectareaId);
        if (!hectarea) {
             return res.status(404).json({ message: 'La HectareaId proporcionada no existe.' });
        }

        const newData = await SensorData.create({
            sensorId,
            co2,
            humidity,
            luminosity,
            HectareaId 
        });
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSensorData = async (req, res) => {
    try {
        // ej: /api/sensor-data?hectareaId=5
        const whereClause = {};
        if (req.query.hectareaId) {
            whereClause.HectareaId = req.query.hectareaId;
        }

        const data = await SensorData.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            include: [Hectarea] 
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getSensorDataById = async (req, res) => {
    try {
        const data = await SensorData.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: 'Lectura no encontrada' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSensorData = async (req, res) => {
    try {
        const [updated] = await SensorData.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(404).json({ message: 'Lectura no encontrada' });
        
        const updatedData = await SensorData.findByPk(req.params.id);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSensorData = async (req, res) => {
    try {
        const deleted = await SensorData.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) return res.status(404).json({ message: 'Lectura no encontrada' });
        res.status(200).json({ message: 'Lectura eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};