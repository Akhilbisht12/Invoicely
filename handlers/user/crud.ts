import getDatabase from "../../lib/mongo";
import { iUser } from "../../types/user";
import type { WithId } from "mongodb";

export const USER = "user";

export const findOneUser = async (query: any): Promise<WithId<iUser> | false> => {
  const database = await getDatabase();
  const user = await database.collection<iUser>(USER).findOne(query);
  if (!user) return false;
  return user;
};

export const insertOneUser = async (user: iUser): Promise<iUser> => {
  const database = await getDatabase();
  await database.collection<iUser>(USER).insertOne(user);
  return user;
};

export const updateOneUser = async (filter: any, update: any) => {
  const database = await getDatabase();
  await database.collection<iUser>(USER).updateOne(filter, update);
};
