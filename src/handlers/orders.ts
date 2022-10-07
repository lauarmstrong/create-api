import express, { Request, Response } from "express";
// import jwt from "jsonwebtoken";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
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
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  //should be products?
  app.delete("./orders/:id", destroy);
};

export default order_routes;
