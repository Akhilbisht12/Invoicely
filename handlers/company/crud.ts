import getDatabase from "../../lib/mongo";
import { iCompany } from "../../types/company";
import type { WithId } from "mongodb";

export const COMPANY = "company";

export const findOneCompany = async (query: any): Promise<WithId<iCompany> | false> => {
  const database = await getDatabase();
  const company = await database.collection<iCompany>(COMPANY).findOne(query);
  if (!company) return false;
  return company;
};

export const insertOneCompany = async (company: iCompany): Promise<iCompany> => {
  const database = await getDatabase();
  await database.collection<iCompany>(COMPANY).insertOne(company);
  return company;
};

export const updateOneCompany = async (filter: any, update: any) => {
  const database = await getDatabase();
  await database.collection<iCompany>(COMPANY).updateOne(filter, update);
};
