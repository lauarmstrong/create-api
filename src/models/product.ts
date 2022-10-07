//@ts-ignore
import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  productCode: string;
};
// Product Model
// Each row is an instance of the product model
export class ProductStore {
  //READ RESTful route
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products, Error: ${error}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, imageUrl, productCode) VALUES($1, $2, $3, $4) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.imageUrl,
        p.productCode,
      ]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
