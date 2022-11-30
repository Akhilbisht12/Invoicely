import { NextApiRequest, NextApiResponse } from "next";
import { checkExistingUser, registerUser } from "../../handlers/user/function";
import { sendMessage } from "../../handlers/whatsapp/sendMessage";
import ErrorHandler from "../../lib/ErrorHandler";
import { idleMenu, onBoarding } from "../../templates/business/business";
import { nodes } from "../../templates/logic";
import { iUser } from "../../types/user";
import iWebhookText from "../../types/whatsapp/webhook/text";
import iWebhook from "../../types/whatsapp/webhook/webhook";

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).send(req.query["hub.challenge"]);
  }
  try {
    const { entry } = <iWebhook>req.body;
    const value = entry[0].changes[0].value;
    const contact = value.contacts[0];
    const message = value.messages[0];
    console.log(contact.profile.name, message);
    const { data } = <{ data: iUser | false }>await checkExistingUser(contact.wa_id);
    if ((message as iWebhookText).text.body.toLowerCase() === "register") {
      if (data) return await sendMessage(idleMenu(contact.profile.name), contact.wa_id);
      await registerUser(contact.wa_id, contact.profile.name);
      await sendMessage(onBoarding(contact.profile.name), contact.wa_id);
      return res.status(200).json({ message: "User On-boarded" });
    }
    if (!data) return res.status(200).json({ message: "user not registered" });
    const userCurrentNode = data.node;
    const todo = nodes.find((item) => item.node === userCurrentNode);
    await todo?.action(req.body);
    return res.status(200).json({ message: "todo resolved" });
  } catch (error: any) {
    console.log(error);
    return ErrorHandler(error, res);
  }
};
export default webhook;
