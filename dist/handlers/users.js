"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers
            .authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        //Failed authentification error
        res.status(401);
        res.json("Access denied, invalid token" + error);
    }
};
exports.verifyAuthToken = verifyAuthToken;
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        //Failed authentification error
        res.status(401);
        res.json(error);
    }
};
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }
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
    // Users can only edit their own information
    // try {
    //   const authorizationHeader: string = (req.headers.authorization as unknown) as string;
    //   const token = authorizationHeader.split(" ")[1];
    //   const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    //   if (decoded.id !== user.id) {
    //     throw new Error("User id does not match!");
    //   }
    // } catch (err) {
    //   //Failed authentification error
    //   res.status(401);
    //   res.json(err);
    //   return;
    // }
    try {
        const updated = await store.create(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        console.log(err);
    }
};
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    //Only logged-in users can create, update or delete a user
    app.post("/users", exports.verifyAuthToken, create);
    app.put("/users/:id", update);
    app.delete("./users/:id", exports.verifyAuthToken, destroy);
    app.post("/authenticate", authenticate);
};
exports.default = user_routes;
