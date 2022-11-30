import getDatabase from "../../lib/mongo";
import { iInvoice } from "../../types/invoice";
import type { WithId } from "mongodb";

export const INVOICE = "invoice";

export const findOneInvoice = async (query: any): Promise<WithId<iInvoice> | false> => {
  const database = await getDatabase();
  const company = await database.collection<iInvoice>(INVOICE).findOne(query);
  if (!company) return false;
  return company;
};

export const insertOneInvoice = async (invoice: iInvoice): Promise<iInvoice> => {
  const database = await getDatabase();
  await database.collection<iInvoice>(INVOICE).insertOne(invoice);
  return invoice;
};

export const updateOneInvoice = async (filter: any, update: any) => {
  const database = await getDatabase();
  await database.collection<iInvoice>(INVOICE).updateOne(filter, update);
};
