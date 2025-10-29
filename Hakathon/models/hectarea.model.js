module.exports = (sequelize, DataTypes) => {
    const Hectarea = sequelize.define('Hectarea', {
        identificador: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Hectarea;
};