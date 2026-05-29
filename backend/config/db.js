const mysql = require('mysql2/promise');
require('dotenv').config();

// Creamos el grupo de conexiones (Pool) usando las variables ocultas
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// El "truco" para verificar en la terminal si se conectó correctamente
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la base de datos en la nube');
        connection.release(); // Liberamos la conexión
    })
    .catch(err => {
        console.error('❌ Error crítico al conectar a la base de datos:', err.message);
    });

module.exports = pool;