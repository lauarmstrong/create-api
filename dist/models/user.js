"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const typescript_1 = require("typescript");
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    async create(u) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.release();
        }
        catch (error) {
            throw new Error(`Cannot create user ${u.username}, error: ${error}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = "SELECT password_digest FROM users WHERE username=($1)";
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + typescript_1.isParameterPropertyDeclaration, user.password_digest)) {
                //returns user id, username, password_digest
                return user;
            }
        }
        // Account does not exist, pass error to the user to tell them to sign up
        return null;
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find user ${id}, error: ${error}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            throw new Error(`Could not delete user ${id}, error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
