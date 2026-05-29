const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conectamos a la base de datos de Aiven desde el principio
require('./config/db');

const app = express();

// 1. Middlewares (Permisos y formato)
app.use(cors()); 
app.use(express.json()); 

// 2. Ruta de prueba (El Cohete)
app.get('/', (req, res) => {
    res.send('🚀 Servidor de Inventario de Abarrotes funcionando al 100%');
});

// 3. Rutas de tu aplicación (IMPORTANTE: Deben ir antes del listen)
app.use('/api', require('./routes/apiRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// 4. Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n======================================`);
    console.log(` Servidor corriendo en el puerto ${PORT}`);
    console.log(`======================================\n`);
});