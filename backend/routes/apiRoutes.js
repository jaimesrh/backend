const express = require('express');
const router = express.Router();
const inventoryCtrl = require('../controllers/inventoryCtrl');

// Definimos las rutas y las conectamos con su controlador
router.get('/productos', inventoryCtrl.getProducts);          // Leer
router.post('/productos', inventoryCtrl.addProduct);          // Crear
router.put('/productos/:id', inventoryCtrl.updateProduct);    // Actualizar
router.delete('/productos/:id', inventoryCtrl.deleteProduct); // Borrar

module.exports = router;