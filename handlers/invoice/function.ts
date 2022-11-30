import { getCustomerGst } from "../../templates/business/business";
import { iHandlerResponse } from "../../types/api/handler";
import { sendMessage } from "../whatsapp/sendMessage";
import { insertOneInvoice, updateOneInvoice } from "./crud";

export const createInvoiceWithCName = async (recipient: number, cName: string): Promise<iHandlerResponse> => {
  const company = await insertOneInvoice({
    cName,
    owner: recipient,
    cAddress: "",
    cGst: "",
    CGst: "",
    consumer: "",
    items: [],
    SGst: "",
    node: "INV-cName",
  });
  return { status: 200, data: company };
};

export const updateInvoiceNode = async (
  owner: number,
  currentNode: string,
  toNode: string
): Promise<iHandlerResponse> => {
  await updateOneInvoice({ owner, node: currentNode }, { $set: { node: toNode } });
  return { status: 200, data: null };
};

export const updateCAddress = async (
  owner: number,
  cAddress: string,
  currentNode: string,
  toNode: string
): Promise<iHandlerResponse> => {
  await updateOneInvoice({ owner, node: currentNode }, { $set: { cAddress, node: toNode } });
  return { status: 200, data: null };
};

export const updateConsumerGst = async (
  owner: number,
  cGst: string,
  currentNode: string,
  toNode: string
): Promise<iHandlerResponse> => {
  await updateOneInvoice({ owner, node: currentNode }, { $set: { cGst, node: toNode } });
  return { status: 200, data: null };
};