import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test for create product use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Funko Pop",
      price: 199.99,
    };

    const output = await usecase.execute(input);

    const productModel = await ProductModel.findOne({
      where: { id: output.id },
    });
    expect(productModel).not.toBeNull();
    expect(productModel.toJSON()).toMatchObject({
      id: output.id,
      name: input.name,
      price: input.price,
    });
    expect(output).toMatchObject({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
