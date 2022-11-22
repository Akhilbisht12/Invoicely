import {
  createNewCompany,
  updateCompanyAddress,
  updateCompanyGst,
  updateCompanyNode,
} from "../handlers/company/function";
import { updateUserNode } from "../handlers/user/function";
import { sendMessage } from "../handlers/whatsapp/sendMessage";
import iWebhookText from "../types/whatsapp/webhook/text";
import iWebhook from "../types/whatsapp/webhook/webhook";
import {
  companyRegistrationSuccess,
  customMessageTemplate,
  getCompanyAddress,
  getCompanyGst,
  getCompanyName,
} from "./business/business";
export const nodes = [
  {
    node: "CR0",
    action: async (body: iWebhook) => {
      const contact = body.entry[0].changes[0].value.contacts[0];
      await sendMessage(getCompanyName(), contact.wa_id);
      await updateUserNode(contact.wa_id, "INPUT-CR0");
    },
  },
  {
    node: "INPUT-CR0",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      const message = <iWebhookText>messages[0];
      if (!message.text) {
        const text = "Sorry! we did'nt understand that. Please send company name in your next message.";
        await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
      await createNewCompany(message.text.body, contacts[0].wa_id);
      await sendMessage(getCompanyAddress(), contacts[0].wa_id);
      await updateUserNode(contacts[0].wa_id, "INPUT-CR1");
      await updateCompanyNode(contacts[0].wa_id, "INPUT-CR1");
    },
  },
  {
    node: "INPUT-CR1",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      const message = <iWebhookText>messages[0];
      if (!message.text) {
        const text = "Sorry! we did'nt understand that. Please send company address in your next message.";
        await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
      await updateCompanyAddress(contacts[0].wa_id, "INPUT-CR2", message.text.body);
      await sendMessage(getCompanyGst(), contacts[0].wa_id);
      await updateUserNode(contacts[0].wa_id, "INPUT-CR2");
    },
  },
  {
    node: "INPUT-CR2",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      const message = <iWebhookText>messages[0];
      if (!message.text) {
        const text = "Sorry! we did'nt understand that. Please send company GST in your next message.";
        await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
      await updateCompanyGst(contacts[0].wa_id, message.text.body);
      await sendMessage(companyRegistrationSuccess(), contacts[0].wa_id);
      await updateUserNode(contacts[0].wa_id, "Idle");
    },
  },
];
