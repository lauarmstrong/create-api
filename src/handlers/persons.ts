import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Person, PersonStore } from "../models/person";

const store = new PersonStore();

const index = async (_req: Request, res: Response) => {
  const persons = await store.index();
  res.json(persons);
};

const show = async (req: Request, res: Response) => {
  const person = await store.show(req.params.id);
  res.json(person);
};

const create = async (req: Request, res: Response) => {
  const person: Person = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    city: req.body.city,
    profession: req.body.profession,
  };
  //Only logged-in users can create a person
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
    const newPerson = await store.create(person);
    res.json(newPerson);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const person_routes = (app: express.Application) => {
  app.get("/persons", index);
  app.get("/persons/:id", show);
  app.post("/persons", create);
  app.delete("./articles/:id", destroy);
};

export default person_routes;
