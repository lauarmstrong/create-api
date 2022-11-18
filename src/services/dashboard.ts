// dashboard runs SQL queries to READ information from the database

//@ts-ignore
import Client from "../database";

export class DashboardQueries {
  // SQL JOIN to get all products that have been included in all orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products from orders: ${err}`);
    }
  }
}
