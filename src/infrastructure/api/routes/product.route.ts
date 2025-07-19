import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUsecase from "../../../usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const input = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(input);
    res.send(output);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).send({ error: errorMessage });
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});
  res.send(output);
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());
  try {
    const input = { id: req.params.id };
    const output = await usecase.execute(input);
    res.send(output);
  } catch (err) {
    res.status(404).send({ error: "Product not found" });
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUsecase(new ProductRepository());
  try {
    const input = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(input);
    res.send(output);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).send({ error: errorMessage });
  }
});
