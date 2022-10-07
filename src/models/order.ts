// @ts-ignore
import { Client } from "../database";

export type Order = {
  id?: number;
  timestamp: Date;
  user_id: string;
  status: string;
};
// Order Model
// Each row is an instance of the order model
export class OrderStore {
  //READ RESTful route
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get orders, Error: ${error}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(p: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (timestamp, user_id, status) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.timestamp, p.user_id, p.status]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${p.timestamp}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
