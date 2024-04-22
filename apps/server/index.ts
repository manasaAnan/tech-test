import { Order } from './generators/productsGenerators';
import fastify from "fastify";
import cors from "@fastify/cors";
import { Database } from "./data/Database";

const app = fastify();
const port = 3000;

app.register(cors, {});

app.get("/products", async (req, res) => {
  res.send(await Database.getProducts());
});

app.get("/users", async (req, res) => {
  res.send(await Database.getUsers());
});

//gets orders
app.get("/orders", async (req, res) => {
  res.send(await Database.getOrders());
});

//creates new order
app.post<{
  Body : Order
}>('/products', async (req, res) => {
  const productID = req.body.product_id;
  /*app.query(`INSERT INTO orders.product_id VALUES(${productID})`, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("successfully inserted values into orders")
      res.code(200).send({productID})
    }
  })*/  
  /*const order = Database.createOrder(req.body.product_id)
  await order.save();
  res.code(200).send({order})*/

})

app.listen({ port }, () => {
  console.log(`Listening on port ${port}`);
});



