import { iHandlerResponse } from "../../types/api/handler";
import { findOneUser, insertOneUser, updateOneUser } from "./crud";

export const checkExistingUser = async (phone: number): Promise<iHandlerResponse> => {
  const data = await findOneUser({ phone });
  return { status: 200, data };
};

export const registerUser = async (phone: number, name: string): Promise<iHandlerResponse> => {
  const data = await insertOneUser({ phone, name, company: [], node: "CR0" });
  return { status: 200, data };
};

export const updateUserNode = async (phone: number, node: string): Promise<iHandlerResponse> => {
  await updateOneUser({ phone }, { $set: { node } });
  return { status: 200, data: null };
};
