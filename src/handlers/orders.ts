import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Order, OrderStore } from "../models/order";
import { verifyAuthToken } from "./users";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    timestamp: req.body.timestamp,
    user_id: req.body.user_id,
    status: req.body.status,
  };
  // Only logged-in users can create an order
  try {
    // const authorizationHeader = req.headers.authorization
    // const token = authorizationHeader.split(' ')[1]
    // jwt.verify(token, process.env.TOKEN_SECRET)
    const newOrder = await store.create(order);
    jwt.sign({ order: newOrder }, process.env.TOKEN_SECRET as Secret);
  } catch (error) {
    //Failed authentification error
    res.status(401);
    res.json(`Invalid token ${error}`);
    return;
  }

  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
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

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
  app.delete("./orders/:id", verifyAuthToken, destroy);
};

export default order_routes;
