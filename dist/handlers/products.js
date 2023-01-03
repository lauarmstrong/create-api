"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        console.log(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        console.log(err);
    }
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
        jsonwebtoken_1.default.sign({ product: newProduct }, process.env.TOKEN_SECRET);
        res.json(newProduct);
    }
    catch (error) {
        // invalid http request
        res.status(400);
        res.json(error);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        // invalid http request
        res.status(400);
        res.json(error);
    }
};
const product_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.delete("./products/:id", destroy);
};
exports.default = product_routes;
