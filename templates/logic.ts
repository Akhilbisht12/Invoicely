import {
  createNewCompany,
  updateCompanyAddress,
  updateCompanyGst,
  updateCompanyNode,
} from "../handlers/company/function";
import {
  createInvoiceWithCName,
  updateCAddress,
  updateConsumerGst,
  updateInvoiceNode,
} from "../handlers/invoice/function";
import { updateUserNode } from "../handlers/user/function";
import { sendMessage } from "../handlers/whatsapp/sendMessage";
import iWebhookReply from "../types/whatsapp/webhook/reply";
import iWebhookText from "../types/whatsapp/webhook/text";
import iWebhook from "../types/whatsapp/webhook/webhook";
import {
  companyRegistrationSuccess,
  customMessageTemplate,
  getCompanyAddress,
  getCompanyGst,
  getCompanyName,
  getCustomerAddress,
  getCustomerGst,
  getCustomerName,
  idleMenu,
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
      if ((messages[0] as iWebhookReply).interactive) {
        if ((messages[0] as iWebhookReply).interactive.button_reply.id === "no_gst") {
        }
      }
      await updateCompanyGst(contacts[0].wa_id, message.text.body);
      await sendMessage(companyRegistrationSuccess(), contacts[0].wa_id);
      await updateUserNode(contacts[0].wa_id, "Idle");
    },
  },
  {
    node: "Idle",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      if ((messages[0] as iWebhookReply).interactive) {
        if ((messages[0] as iWebhookReply).interactive.button_reply.id === "invoice") {
          await sendMessage(getCustomerName(), contacts[0].wa_id);
          await updateUserNode(contacts[0].wa_id, "Inv-cName");
        }
      }
      await sendMessage(idleMenu(contacts[0].profile.name), contacts[0].wa_id);
    },
  },
  {
    node: "Inv-cName",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      const message = <iWebhookText>messages[0];
      await createInvoiceWithCName(contacts[0].wa_id, message.text.body);
      await sendMessage(getCustomerAddress(), contacts[0].wa_id);
      await updateUserNode(contacts[0].wa_id, "Inv-cAddress");
    },
  },
  {
    node: "Inv-cAddress",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      const message = <iWebhookText>messages[0];
      const currentNode = "Inv-cAddress";
      const toNode = "Inv-cGst";
      await updateCAddress(contacts[0].wa_id, message.text.body, currentNode, toNode);
      await sendMessage(getCustomerGst(), contacts[0].wa_id);
      updateUserNode(contacts[0].wa_id, toNode);
    },
  },
  {
    node: "Inv-cGst",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;

      const currentNode = "Inv-cGst";
      const toNode = "Inv-pName";
      if ((messages[0] as iWebhookReply).interactive.button_reply.id === "skip_cGst") {
        return await updateInvoiceNode(contacts[0].wa_id, currentNode, toNode);
      } else {
        await updateConsumerGst(contacts[0].wa_id, (messages[0] as iWebhookText).text.body, currentNode, toNode);
      }
      // sendMessage(addProduct());
      updateUserNode(contacts[0].wa_id, toNode);
    },
  },
];
