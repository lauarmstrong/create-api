"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe("Product Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("index should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
