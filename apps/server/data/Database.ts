import { Product, Order } from './../generators/productsGenerators';
import { generateProductData } from "../generators/productsGenerators";
import { generateUserData } from "../generators/usersGenerator";

/**
 * Treat this as a fake local database.
 * Implement functions that will help you create/read/update/delete the mocked data
 */
export class Database {
  private static data = { ...generateProductData(), ...generateUserData() };

  static async getProducts() {
    return this.data.products;
  }

  static async getUsers() {
    return this.data.users;
  }

  static async getOrders() {
    return this.data.orders;
  }

  static async createProduct(prod : Product) {
    return prod;
  }

  static async createOrder(order : string) {
    return order;
  }


}

export async function readProducts() {
  //const productList : Array <any> = []
  const result = await Database.getProducts();
  //productList.push(result);
  console.log(result);
  return result;

  /*const products = [];
  const result = await Database.getProducts();
  products.push(result);
  return products;*/

  /*products.push(Database.getProducts())
  return Promise.all(products).then(result => {
    products = result;
  })*/
  
}
