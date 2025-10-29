module.exports = (sequelize, DataTypes) => {
    const SensorData = sequelize.define('SensorData', {
        sensorId: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        co2: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        luminosity: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    });

    return SensorData;
};