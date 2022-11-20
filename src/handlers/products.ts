import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    productCode: req.body.productCode,
  };

  try {
    const newProduct = await store.create(product);
    jwt.sign({ product: newProduct }, process.env.TOKEN_SECRET as Secret);

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
