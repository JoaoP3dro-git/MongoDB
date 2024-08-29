const Product = require('../models/Product');

class ProductController {
    static async create(req, res) {
        const { name, description, value } = req.body;

        if (!name || !description || !value)
            return res.status(400).json({ message: "Dados inválidos" });

        const product = {
            name: name,
            description: description,
            value: value
        }

        try {
            const prod = await Product.create(product);
            return res.status(201).json({ message: "Produto inserido com sucesso", body: prod });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    };

    static async getProduct(req, res) {
        const { id } = req.params;

        try {
            if (id) {
                const product = await Product.findById(id);

                if (product) {
                    return res.status(200).json({ data: product });
                } else {
                    return res.status(404).json({ error: error });
                }
            } else {
                const product = await Product.find();

                return res.status(200).json({ data: product });
            }
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    };

    static async delete(req, res) {
        const { id } = req.params;

        try {
            if (id) {
                const product = await Product.findById(id);

                if (product) {
                    await Product.deleteOne(product);
                    return res.status(204).send();
                } else {
                    return res.status(404).json({ error: error });
                }
            } else {
                return res.status(404).json({ error: error });
            }
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    };

    static async update(req, res) {
        const { id } = req.params;
        const { name, description, value } = req.body;

        if (!name || !description || !value)
            return res.status(400).json({ message: "Dados inválidos" });

        const updatedProduct = {
            name: name,
            description: description,
            value: value
        }

        try {
            if (id) {
                const product = await Product.findById(id);

                if (product) {
                    const prod = await Product.updateOne(product, updatedProduct);
                    return res.status(201).json({ message: "Produto atualizado com sucesso", body: prod });
                } else {
                    return res.status(404).json({ error: error });
                }
            } else {
                return res.status(404).json({ error: error });
            }
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    };
}

module.exports = ProductController;