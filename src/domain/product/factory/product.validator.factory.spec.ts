import Notification from "../../@shared/notification/notification";
import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductYupValidator from "../validator/product.yup.validator";
import ProductValidatorFactory from "./product.validator.factory";

describe("Product Validator Factory", () => {
  it("should create a ProductYupValidator", () => {
    const validator = ProductValidatorFactory.create();

    expect(validator).toBeInstanceOf(ProductYupValidator);
  });

  it("should validate Product with factory validator", () => {
    const validator = ProductValidatorFactory.create();
    const product = new Product("1", "Product 1", 100);

    expect(() => validator.validate(product)).not.toThrow();
  });

  it("should validate ProductB with factory validator", () => {
    const validator = ProductValidatorFactory.create();
    const product = new ProductB("1", "Product B", 100);

    expect(() => validator.validate(product)).not.toThrow();
  });

  it("should validate ProductEntityWithNotification with factory validator", () => {
    const validator = ProductValidatorFactory.create();
    const mockProduct = {
      id: "1",
      name: "Product 1",
      price: 100,
      notification: new Notification(),
    };

    expect(() => validator.validate(mockProduct)).not.toThrow();
  });
});
