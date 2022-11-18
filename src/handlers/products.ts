import express, { Request, Response } from "express";
// import jwt from "jsonwebtoken";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
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
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      productCode: req.body.productCode,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    // invalid http request
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    // invalid http request
    res.status(400);
    res.json(error);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("./products/:id", destroy);
};

export default product_routes;
