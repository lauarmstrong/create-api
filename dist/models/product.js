"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
// Product Model
// Each row is an instance of the product model
class ProductStore {
    //READ RESTful route
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get products, Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM products WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = "INSERT INTO products (name, price, imageUrl, productCode) VALUES($1, $2, $3, $4) RETURNING *";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.imageUrl,
                p.productCode,
            ]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM products WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
