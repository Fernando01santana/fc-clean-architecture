import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: "Boneco Funko Pop",
    price: 200
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(), 
        find: jest.fn(), 
        findAll: jest.fn(), 

    }
}

describe("Unit test create product use case", () => {
    it("shound create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })
})