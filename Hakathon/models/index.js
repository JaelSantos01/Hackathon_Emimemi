const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');

const db = {};

db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Campo = require('./campo.model')(sequelize, DataTypes);          
db.Hectarea = require('./hectarea.model')(sequelize, DataTypes);     
db.SensorData = require('./sensorData.model')(sequelize, DataTypes);

db.User.hasMany(db.Campo, {
    foreignKey: {
        allowNull: false 
    },
    onDelete: 'CASCADE' 
});
db.Campo.belongsTo(db.User);


db.Campo.hasMany(db.Hectarea, {
    foreignKey: {
        allowNull: false 
    },
    onDelete: 'CASCADE' 
});
db.Hectarea.belongsTo(db.Campo); 

db.Hectarea.hasMany(db.SensorData, {
    foreignKey: {
        allowNull: false 
    },
    onDelete: 'CASCADE' 
});
db.SensorData.belongsTo(db.Hectarea);

module.exports = db;