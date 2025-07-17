import Product from "../../../domain/product/entity/product"
import UpdateProductUsecase from "./update.product.usecase"
    const product = new Product("123","Games",100)
    const input = {
      id:product.id,
      name: "Games",
      price: 100
    }

    const MockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn().mockReturnValue(Promise.resolve(input)), 
            find: jest.fn().mockReturnValue(Promise.resolve(product)), 
            findAll: jest.fn(), 
        }
    }
describe("Should test update product use case",() => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUsecase(productRepository);

    const output = await productUpdateUseCase.execute(input);
    console.log(output)
    expect(output).toEqual(input);
  });    
})