const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permite que tu frontend se comunique con este servidor
app.use(express.json()); // Permite recibir datos en formato JSON

// Probar que el servidor vive
app.get('/', (req, res) => {
    res.send('🚀 Servidor de Inventario de Abarrotes funcionando al 100%');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n======================================`);
    console.log(` Servidor corriendo en el puerto ${PORT}`);
    console.log(`======================================\n`);
});
// Middlewares
app.use(cors()); 
app.use(express.json()); 

// 🚨 AGREGA ESTA LÍNEA AQUÍ PARA ACTIVAR TUS RUTAS 🚨
app.use('/api', require('./routes/apiRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Probar que el servidor vive...
// Importamos la conexión a la base de datos para que se active
require('./config/db');