import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test for list product use case", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Xbox Series X", 4000);
    const product2 = new Product("2", "Nintendo Switch", 2500);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);
    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "1",
          name: "Xbox Series X",
          price: 4000,
        }),
        expect.objectContaining({
          id: "2",
          name: "Nintendo Switch",
          price: 2500,
        }),
      ])
    );
  });
});
