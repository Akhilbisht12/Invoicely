import getDatabase from "../../lib/mongo";
import type { WithId } from "mongodb";
import { iProduct } from "../../types/product";

export const PRODUCT = "product";

export const findOneProduct = async (query: any): Promise<WithId<iProduct> | boolean> => {
  const database = await getDatabase();
  const product = await database.collection<iProduct>(PRODUCT).findOne(query);
  if (!product) return false;
  return product;
};

export const insertOneProduct = async (product: iProduct): Promise<iProduct> => {
  const database = await getDatabase();
  await database.collection<iProduct>(PRODUCT).insertOne(product);
  return product;
};

export const updateOneProduct = async (filter: any, update: any) => {
  const database = await getDatabase();
  await database.collection<iProduct>(PRODUCT).updateOne(filter, update);
};

export const findProduct = async (query: any): Promise<iProduct[]> => {
  const database = await getDatabase();
  const products = await database.collection<iProduct>(PRODUCT).find(query).toArray();
  return products;
};
