const { User } = require('../models');
const bcrypt = require("bcrypt");


exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); 
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const [updatedRows] = await User.update(req.body, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// [D]ELETE
exports.deleteUser = async (req, res) => {
    try {
        const deletedRows = await User.destroy({
            where: { id: req.params.id }
        });
        
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};