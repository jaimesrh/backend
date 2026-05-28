const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'mi_llave_super_secreta_123';

const authCtrl = {
    registro: async (req, res) => {
        // 🆕 Ahora también recibimos el ROL
        const { email, password, rol } = req.body; 
        try {
            const [existe] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            if (existe.length > 0) return res.status(400).json({ msg: "El correo ya está registrado" });
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            
            // 🆕 Guardamos el correo, la contraseña y el rol
            await db.query('INSERT INTO usuarios (email, password, rol) VALUES (?, ?, ?)', [email, hash, rol]);
            res.status(201).json({ msg: "Usuario registrado con éxito" });
        } catch (error) {
            res.status(500).json({ msg: "Error al registrar", error: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            if (rows.length === 0) return res.status(401).json({ msg: "Usuario no encontrado" });

            const user = rows[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(401).json({ msg: "Contraseña incorrecta" });

            const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, SECRET_KEY, { expiresIn: '8h' });
            
            // 🆕 Enviamos el token y también el ROL del usuario
            res.json({ token, rol: user.rol, msg: "Bienvenido" });
        } catch (error) {
            res.status(500).json({ msg: "Error en el servidor", error: error.message });
        }
    }
};

module.exports = authCtrl;