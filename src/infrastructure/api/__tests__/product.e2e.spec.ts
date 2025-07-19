import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Notebook",
      price: 3500,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Notebook");
    expect(response.body.price).toBe(3500);
    expect(response.body.id).toBeDefined();
  });

  it("should not create a product with invalid data", async () => {
    const response = await request(app)
      .post("/product")
      .send({ name: "", price: -10 });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should list all products", async () => {
    await request(app).post("/product").send({ name: "TV", price: 2000 });
    await request(app).post("/product").send({ name: "Monitor", price: 1200 });
    const response = await request(app).get("/product");
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].name).toBeDefined();
    expect(response.body.products[1].name).toBeDefined();
  });

  it("should get a product by id", async () => {
    const createResponse = await request(app)
      .post("/product")
      .send({ name: "Mouse", price: 150 });
    const id = createResponse.body.id;
    const response = await request(app).get(`/product/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
    expect(response.body.name).toBe("Mouse");
    expect(response.body.price).toBe(150);
  });

  it("should return 404 if product not found", async () => {
    const response = await request(app).get("/product/doesnotexist");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");
  });

  it("should update a product", async () => {
    const createResponse = await request(app)
      .post("/product")
      .send({ name: "Teclado", price: 100 });
    const id = createResponse.body.id;
    const response = await request(app)
      .put(`/product/${id}`)
      .send({ name: "Teclado Mecânico", price: 300 });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
    expect(response.body.name).toBe("Teclado Mecânico");
    expect(response.body.price).toBe(300);
  });

  it("should return 500 if update fails", async () => {
    const response = await request(app)
      .put("/product/invalidid")
      .send({ name: "Qualquer", price: 10 });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});
