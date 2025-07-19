import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";

describe("Integration test for update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Old Name", 100);
    await productRepository.create(product);

    const usecase = new UpdateProductUsecase(productRepository);
    const input = {
      id: "1",
      name: "New Name",
      price: 200,
    };
    const output = await usecase.execute(input);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    expect(productModel).not.toBeNull();
    expect(productModel.toJSON()).toMatchObject({
      id: "1",
      name: "New Name",
      price: 200,
    });
    expect(output).toEqual({
      id: "1",
      name: "New Name",
      price: 200,
    });
  });
});
