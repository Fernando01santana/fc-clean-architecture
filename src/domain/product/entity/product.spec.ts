import NotificationError from "../../@shared/notification/notification.error";
import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrow(NotificationError);
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrow(NotificationError);
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrow(NotificationError);
  });

  it("should throw error when price is zero", () => {
    expect(() => {
      const product = new Product("123", "Name", 0);
    }).toThrow(NotificationError);
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should throw error when changing name to empty", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrow(NotificationError);
  });

  it("should throw error when changing price to negative", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(-10);
    }).toThrow(NotificationError);
  });

  it("should throw error when changing price to zero", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(0);
    }).toThrow(NotificationError);
  });

  it("should create a valid product", () => {
    const product = new Product("123", "Product 1", 100);
    expect(product.id).toBe("123");
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
  });
});
