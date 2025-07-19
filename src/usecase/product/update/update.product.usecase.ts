import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputCreateProductDto } from "../create/create.product.dto";
import {  InputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUsecase{
    private ProductRepository: ProductRepositoryInterface;
    constructor(ProductRepository: ProductRepositoryInterface){
        this.ProductRepository = ProductRepository
    }

    async execute(input: InputUpdateProductDto): Promise<OutputCreateProductDto>{
        const product = await this.ProductRepository.find(input.id)
        product.changeName(input.name)
        product.changePrice(input.price)

        await this.ProductRepository.update(product)
        return {
            id:product.id,
            name: product.name,
            price: product.price
        }
    }
}