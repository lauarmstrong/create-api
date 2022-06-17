import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import product_routes from "./handlers/products";
import user_routes from "./handlers/users";
import dashboardRoutes from "./handlers/dashboardRoutes";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

product_routes(app);
user_routes(app);
dashboardRoutes(app);

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
