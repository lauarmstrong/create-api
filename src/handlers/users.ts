import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User, UserStore } from "../models/user";

const store = new UserStore();

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const authorizationHeader: string = req.headers
      .authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);

    next();
  } catch (error) {
    //Failed authentification error
    res.status(401);
    res.json("Access denied, invalid token" + error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } catch (error) {
    //Failed authentification error
    res.status(401);
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
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
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    console.log(err);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  //Only logged-in users can create, update or delete a user
  app.post("/users", verifyAuthToken, create);
  app.put("/users/:id", update);
  app.delete("./users/:id", verifyAuthToken, destroy);
  app.post("/authenticate", authenticate);
};

export default user_routes;
