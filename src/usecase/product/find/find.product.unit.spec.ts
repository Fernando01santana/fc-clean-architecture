import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase"

const product = new Product("123","Games",100)

const MockRepository = () => {
        return {
        create: jest.fn(),
        update: jest.fn(), 
        find: jest.fn().mockReturnValue(Promise.resolve(product)), 
        findAll: jest.fn(), 
    }
}

describe("Unit Test find product use case",() => {
    it("should find a product", async () => {
        const input = {
            id: "123",
        };

        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Games",
            price: 100
        })
    })
})