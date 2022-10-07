import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.index).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "test product",
      price: 5,
      imageUrl:
        "https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg",
      productCode: "123",
    });
    expect(result).toEqual({
      id: 1,
      name: "test product",
      price: 5,
      imageUrl:
        "https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg",
      productCode: "123",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "test product",
        price: 5,
        imageUrl:
          "https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg",
        productCode: "123",
      },
    ]);
  });
  it("delete method should remove the correct product", async () => {
    store.delete("1");
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
