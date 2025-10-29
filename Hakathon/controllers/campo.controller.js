const { Campo, Hectarea } = require('../models'); 

exports.createCampo = async (req, res) => {
    try {
        const newCampo = await Campo.create(req.body);
        res.status(201).json(newCampo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCampos = async (req, res) => {
    try {
        const campos = await Campo.findAll();
        res.status(200).json(campos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCampoById = async (req, res) => {
    try {
        const campo = await Campo.findByPk(req.params.id, {
            include: [{ 
                model: Hectarea 
            }]
        });
        if (!campo) return res.status(404).json({ message: 'Campo no encontrado' });
        res.status(200).json(campo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCampo = async (req, res) => {
    try {
        const [updated] = await Campo.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(404).json({ message: 'Campo no encontrado' });
        
        const updatedCampo = await Campo.findByPk(req.params.id);
        res.status(200).json(updatedCampo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCampo = async (req, res) => {
    try {
        const deleted = await Campo.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) return res.status(404).json({ message: 'Campo no encontrado' });
        res.status(200).json({ message: 'Campo eliminado (y sus hectáreas)' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};