"use strict";
// dashboard runs SQL queries to READ information from the database
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // SQL JOIN to get all products that have been included in all orders
    async productsInOrders() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get products from orders: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
