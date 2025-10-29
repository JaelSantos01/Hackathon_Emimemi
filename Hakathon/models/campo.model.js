module.exports = (sequelize, DataTypes) => {
    const Campo = sequelize.define('Campo', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ubicacionMunicipio: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Campo;
};