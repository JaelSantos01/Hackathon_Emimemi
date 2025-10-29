const { Hectarea, Campo } = require('../models');

exports.createHectarea = async (req, res) => {
    try {
        const { identificador, CampoId } = req.body; 

        const campo = await Campo.findByPk(CampoId);
        if (!campo) {
            return res.status(404).json({ message: 'El CampoId proporcionado no existe.' });
        }

        const newHectarea = await Hectarea.create({ identificador, CampoId });
        res.status(201).json(newHectarea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllHectareas = async (req, res) => {
    try {
        // ej: /api/hectareas?campoId=1
        const whereClause = {};
        if (req.query.campoId) {
            whereClause.CampoId = req.query.campoId;
        }
        
        const hectareas = await Hectarea.findAll({ 
            where: whereClause,
            include: [Campo] 
        });
        res.status(200).json(hectareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHectareaById = async (req, res) => {
    try {
        const hectarea = await Hectarea.findByPk(req.params.id, {
             include: [Campo]
        });
        if (!hectarea) return res.status(404).json({ message: 'Hectárea no encontrada' });
        res.status(200).json(hectarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateHectarea = async (req, res) => {
    try {
        const [updated] = await Hectarea.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(404).json({ message: 'Hectárea no encontrada' });
        
        const updatedHectarea = await Hectarea.findByPk(req.params.id);
        res.status(200).json(updatedHectarea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteHectarea = async (req, res) => {
    try {
        const deleted = await Hectarea.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) return res.status(404).json({ message: 'Hectárea no encontrada' });
        res.status(200).json({ message: 'Hectárea eliminada (y sus datos de sensor)' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};