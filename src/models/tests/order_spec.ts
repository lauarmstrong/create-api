import { Order, OrderStore } from "../order";

const store = new OrderStore();

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined;
  });
  it("should have an show method", () => {
    expect(store.show).toBeDefined;
  });
  it("should have an create method", () => {
    expect(store.create).toBeDefined;
  });
  it("should have an delete method", () => {
    expect(store.delete).toBeDefined;
  });
  it("create method should add an order", async () => {
    const result = await store.create({
      timestamp: new Date(),
      user_id: "123",
      status: "SUCCESS",
    });
    expect(result).toEqual({
      id: 1,
      timestamp: new Date(),
      user_id: "123",
      status: "SUCCESS",
    });
  });
  it("index method should return a list of order", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        timestamp: new Date(),
        user_id: "123",
        status: "SUCCESS",
      },
    ]);
  });
  it("delete method should remove the correct order", async () => {
    store.delete("1");
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
