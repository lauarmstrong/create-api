import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    next();
    //Failed authentification error
  } catch (error) {
    res.status(401);
    // res.json('Access denied, invalid token' + error)
    // return
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.id !== user.id) {
      throw new Error("User id does not match!");
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }

  try {
    const updated = await store.create(user);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  //Only logged-in users can create, update or delete a user
  app.post("/users", verifyAuthToken, create);
  app.put("/users/:id", update);
  app.delete("./users/:id", verifyAuthToken, destroy);
};

export default user_routes;
