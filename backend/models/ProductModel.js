const db = require('../config/db');

const ProductModel = {
    // Obtener todos los productos
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM productos');
        return rows;
    },
    
    // Crear un producto nuevo
    create: async (product) => {
        const { id, name, category, supplier, stock, minStock, unit, price } = product;
        const [result] = await db.query(
            'INSERT INTO productos (id, name, category, supplier, stock, minStock, unit, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, name, category, supplier, stock, minStock, unit, price]
        );
        return result;
    },

    // Actualizar un producto existente
    update: async (id, product) => {
        const { name, category, supplier, stock, minStock, unit, price } = product;
        const [result] = await db.query(
            'UPDATE productos SET name=?, category=?, supplier=?, stock=?, minStock=?, unit=?, price=? WHERE id=?',
            [name, category, supplier, stock, minStock, unit, price, id]
        );
        return result;
    },

    // Eliminar un producto
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM productos WHERE id=?', [id]);
        return result;
    }
};

module.exports = ProductModel;