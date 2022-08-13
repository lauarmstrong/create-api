"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        productCode: req.body.productCode,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const product_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.delete("./articles/:id", destroy);
};
exports.default = product_routes;
