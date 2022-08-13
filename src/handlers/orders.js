"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const create = async (req, res) => {
    const order = {
        timestamp: req.body.timestamp,
        user_id: req.body.user_id,
        status: req.body.status,
    };
    //Only logged-in users can create an order
    //   try {
    //     const authorizationHeader = req.headers.authorization
    //     const token = authorizationHeader.split(' ')[1]
    //     jwt.verify(token, process.env.TOKEN_SECRET)
    //   } catch (error) {
    //       //Failed authentification error
    //       res.status(401)
    //       res.json(`Invalid token ${error}`)
    //       return
    //   }
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
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
const order_routes = (app) => {
    app.get("/orders", index);
    app.get("/orders/:id", show);
    app.post("/orders", create);
    app.delete("./articles/:id", destroy);
};
exports.default = order_routes;
