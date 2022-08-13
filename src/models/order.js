"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = require("../database");
// Order Model
// Each row is an instance of the order model
class OrderStore {
    //READ RESTful route
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get orders, Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = "INSERT INTO orders (timestamp, user_id, status) VALUES($1, $2, $3) RETURNING *";
            // @ts-ignore
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [p.timestamp, p.user_id, p.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${timestamp}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM orders WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
