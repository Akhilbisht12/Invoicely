import { iHandlerResponse } from "../../types/api/handler";
import { insertOneCompany, updateOneCompany } from "./crud";

export const createNewCompany = async (name: string, recipient: number): Promise<iHandlerResponse> => {
  const company = await insertOneCompany({
    name: name,
    address: "",
    email: "",
    phone: recipient,
    gst: "",
    pan: "",
    signature: "",
    node: "INPUT-CR0",
  });
  return { status: 200, data: company };
};

export const updateCompanyNode = async (phone: number, node: string): Promise<iHandlerResponse> => {
  await updateOneCompany({ phone, node: { $exist: true } }, { $set: { node } });
  return { status: 200, data: null };
};

export const updateCompanyAddress = async (phone: number, node: string, address: string): Promise<iHandlerResponse> => {
  await updateOneCompany({ phone }, { $set: { address, node } });
  return { status: 200, data: null };
};

export const updateCompanyGst = async (phone: number, gst: string): Promise<iHandlerResponse> => {
  await updateOneCompany({ phone }, { $set: { gst }, $unset: { node: "" } });
  return { status: 200, data: null };
};
