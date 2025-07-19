import Notification from "../../@shared/notification/notification";
import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductYupValidator from "./product.yup.validator";

describe("Product Yup Validator", () => {
  it("should validate a valid product", () => {
    const product = new Product("1", "Product 1", 100);
    const validator = new ProductYupValidator();

    expect(() => validator.validate(product)).not.toThrow();
  });

  it("should validate a valid product B", () => {
    const product = new ProductB("1", "Product B", 100);
    const validator = new ProductYupValidator();

    expect(() => validator.validate(product)).not.toThrow();
  });

  it("should add error when id is empty", () => {
    const mockProduct = {
      id: "",
      name: "Product 1",
      price: 100,
      notification: new Notification(),
    };
    const validator = new ProductYupValidator();

    validator.validate(mockProduct);

    expect(mockProduct.notification.hasErrors()).toBe(true);
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Id is required",
    });
  });

  it("should add error when name is empty", () => {
    const mockProduct = {
      id: "1",
      name: "",
      price: 100,
      notification: new Notification(),
    };
    const validator = new ProductYupValidator();

    validator.validate(mockProduct);

    expect(mockProduct.notification.hasErrors()).toBe(true);
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Name is required",
    });
  });

  it("should add error when price is negative", () => {
    const mockProduct = {
      id: "1",
      name: "Product 1",
      price: -10,
      notification: new Notification(),
    };
    const validator = new ProductYupValidator();

    validator.validate(mockProduct);

    expect(mockProduct.notification.hasErrors()).toBe(true);
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Price must be greater than zero",
    });
  });

  it("should add error when price is zero", () => {
    const mockProduct = {
      id: "1",
      name: "Product 1",
      price: 0,
      notification: new Notification(),
    };
    const validator = new ProductYupValidator();

    validator.validate(mockProduct);

    expect(mockProduct.notification.hasErrors()).toBe(true);
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Price must be greater than zero",
    });
  });

  it("should add multiple errors when multiple validations fail", () => {
    const mockProduct = {
      id: "",
      name: "",
      price: -10,
      notification: new Notification(),
    };
    const validator = new ProductYupValidator();

    validator.validate(mockProduct);

    expect(mockProduct.notification.hasErrors()).toBe(true);
    expect(mockProduct.notification.getErrors()).toHaveLength(3);
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Id is required",
    });
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Name is required",
    });
    expect(mockProduct.notification.getErrors()).toContainEqual({
      context: "product",
      message: "Price must be greater than zero",
    });
  });
});
