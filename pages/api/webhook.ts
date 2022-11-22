import { NextApiRequest, NextApiResponse } from "next";
import { checkExistingUser, registerUser, updateUserNode } from "../../handlers/user/function";
import { sendMessage } from "../../handlers/whatsapp/sendMessage";
import ErrorHandler from "../../lib/ErrorHandler";
import { onBoarding } from "../../templates/business/business";
import { nodes } from "../../templates/logic";
import { iUser } from "../../types/user";
import iWebhook from "../../types/whatsapp/webhook/webhook";

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json({ message: "hello there" });
  }
  try {
    const { entry } = <iWebhook>req.body;
    const contact = entry[0].changes[0].value.contacts[0];
    const { data } = <{ data: iUser | false }>await checkExistingUser(contact.wa_id);
    if (!data) {
      await registerUser(contact.wa_id, contact.profile.name);
      await sendMessage(onBoarding(contact.profile.name), contact.wa_id);
      return res.status(200).json({ message: "User On-boarded" });
    }
    const userCurrentNode = data.node;
    const todo = nodes.find((item) => item.node === userCurrentNode);
    await todo?.action(req.body);
    return res.status(200).json({ message: "todo resolved" });
  } catch (error: any) {
    return ErrorHandler(error, res);
  }
};
export default webhook;
