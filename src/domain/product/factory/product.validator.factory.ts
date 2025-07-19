import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductYupValidator from "../validator/product.yup.validator";

interface ProductEntityWithNotification {
  id: string;
  name: string;
  price: number;
  notification: {
    addError: (error: { context: string; message: string }) => void;
  };
}

type ProductEntity = Product | ProductB | ProductEntityWithNotification;

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductEntity> {
    return new ProductYupValidator();
  }
}
