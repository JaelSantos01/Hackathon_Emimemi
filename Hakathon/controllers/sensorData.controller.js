const { SensorData, Hectarea, Campo, User } = require('../models');
const sorobanService = require('../service/soroban.service');


exports.createSensorData = async (req, res) => {
    try {
        const { sensorId, co2, humidity, luminosity, HectareaId } = req.body;

        let userWallet;
        let hectarea;
        try {
            hectarea = await Hectarea.findByPk(HectareaId, {
                include: {
                    model: Campo,
                    include: {
                        model: User,
                        attributes: ['stellarWalletAddress']
                    }
                }
            });
        } catch (findError) {
            console.error("Error en la consulta de propietario:", findError);
            return res.status(500).json({ message: "Error al buscar al propietario." });
        }

        if (!hectarea) {
            return res.status(404).json({ message: 'La HectareaId proporcionada no existe.' });
        }
        if (!hectarea.Campo || !hectarea.Campo.User) {
            return res.status(404).send({ message: "No se encontró un Campo o Usuario asociado a esta Hectárea." });
        }
        userWallet = hectarea.Campo.User.stellarWalletAddress;
        if (!userWallet) {
            return res.status(400).send({
                message: "El propietario de esta hectárea aún no ha configurado una billetera de Stellar en su perfil."
            });
        }

        const newData = await SensorData.create({
            sensorId,
            co2,
            humidity,
            luminosity,
            HectareaId
        });

        try {
            const co2AsInt = Math.floor(co2);
            await sorobanService.callMintCo2Tokens(userWallet, co2AsInt);

            res.status(201).json({
                message: "Datos guardados en BD y tokens acuñados en Blockchain.",
                data: newData
            });

        } catch (contractError) {
            console.error("Error en contrato de Soroban:", contractError);
            res.status(500).json({
                message: "Datos guardados en BD, pero falló la acuñación de tokens.",
                dbData: newData,
                contractError: contractError.message
            });
        }

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