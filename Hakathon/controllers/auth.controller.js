const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const userData = user.toJSON();
    delete userData.password;

    res.json({ message: "Login exitoso", user: userData });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
