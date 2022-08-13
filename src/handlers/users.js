"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
        //Failed authentification error
    }
    catch (error) {
        res.status(401);
    }
};
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const update = async (req, res) => {
    const user = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.id !== user.id) {
            throw new Error("User id does not match!");
        }
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const updated = await store.create(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    //Only logged-in users can create, update or delete a user
    app.post("/users", verifyAuthToken, create);
    app.put("/users/:id", update);
    app.delete("./articles/:id", verifyAuthToken, destroy);
};
exports.default = user_routes;
