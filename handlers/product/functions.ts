import { iHandlerResponse } from "../../types/api/handler";
import { iProduct } from "../../types/product";
import { findProduct, insertOneProduct, updateOneProduct } from "./crud";

export const createProductWithName = async (name: string, phoneNo: number): Promise<iHandlerResponse> => {
  const product = await insertOneProduct({
    name,
    description: "",
    category: ["unCategorized"],
    hsn: "",
    image: "",
    owner: phoneNo,
    price: 0,
    salePrice: 0,
    shortDescription: "",
    node: "Inv-pDesc",
  });
  return { data: product, status: 200 };
};

export const updateProductDescription = async (desc: string, phoneNo: number, currentNode: string, toNode: string) => {
  const updatedProduct = await updateOneProduct(
    { owner: phoneNo, node: currentNode },
    { $set: { description: desc, node: toNode } }
  );
  return { data: updatedProduct, status: 200 };
};

export const updateProductPrice = async (
  price: number | string,
  phoneNo: number,
  currentNode: string,
  toNode: string
): Promise<iHandlerResponse> => {
  const updatedProduct = await updateOneProduct(
    { owner: phoneNo, node: currentNode },
    { $set: { price, node: toNode } }
  );
  return { data: updatedProduct, status: 200 };
};

export const updateProductHsn = async (
  hsn: number | string,
  phoneNo: number,
  currentNode: string
): Promise<iHandlerResponse> => {
  const updatedProduct = await updateOneProduct(
    { owner: phoneNo, node: currentNode },
    { $set: { hsn }, $unset: { node: "" } }
  );
  return { data: updatedProduct, status: 200 };
};

export const findOwnerProducts = async (phoneNo: number): Promise<iHandlerResponse> => {
  const products = await findProduct({ owner: phoneNo });
  return { data: products, status: 200 };
};
