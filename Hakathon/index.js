require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const db = require('./models');

const userRoutes = require('./routes/user.routes');
const campoRoutes = require('./routes/campo.routes');         
const hectareaRoutes = require('./routes/hectarea.routes');   
const sensorDataRoutes = require('./routes/sensorData.routes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Sensores con MySQL está funcionando');
});

app.use('/api/users', userRoutes);
app.use('/api/campos', campoRoutes);           
app.use('/api/hectareas', hectareaRoutes);     
app.use('/api/sensor-data', sensorDataRoutes);

// Conectar y Sincronizar la Base de Datos
console.log('Conectando a la base de datos...');
db.sequelize.authenticate()
    .then(() => {
        console.log('Conexión a MySQL establecida exitosamente.');

        return db.sequelize.sync();
        //return db.sequelize.sync({ force: true }); // Usar con precaución: elimina y recrea tablas
    })
    .then(() => {
        console.log('Tablas sincronizadas.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar o sincronizar la base de datos:', err);
    });