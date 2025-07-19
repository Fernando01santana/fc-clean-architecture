import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductB from "../entity/product-b";

interface ProductEntityWithNotification {
  id: string;
  name: string;
  price: number;
  notification: {
    addError: (error: { context: string; message: string }) => void;
  };
}

type ProductEntity = Product | ProductB | ProductEntityWithNotification;

export default class ProductYupValidator
  implements ValidatorInterface<ProductEntity>
{
  validate(entity: ProductEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .positive("Price must be greater than zero")
            .required("Price is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
