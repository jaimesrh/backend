const ProductModel = require('../models/ProductModel');

const inventoryCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await ProductModel.getAll();
            res.json(products); // Le mandamos los datos a la app
        } catch (error) {
            res.status(500).json({ msg: "Error al obtener productos", error: error.message });
        }
    },

    addProduct: async (req, res) => {
        try {
            await ProductModel.create(req.body);
            res.json({ msg: "Producto creado correctamente" });
        } catch (error) {
            res.status(500).json({ msg: "Error al crear producto", error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            await ProductModel.update(req.params.id, req.body);
            res.json({ msg: "Producto actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ msg: "Error al actualizar producto", error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await ProductModel.delete(req.params.id);
            res.json({ msg: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ msg: "Error al eliminar producto", error: error.message });
        }
    }
};

module.exports = inventoryCtrl;