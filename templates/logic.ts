import {
  createNewCompany,
  updateCompanyAddress,
  updateCompanyGst,
  updateCompanyNode,
} from "../handlers/company/function";
import {
  addProductQuantity,
  addProductToInvoice,
  createInvoiceWithCName,
  updateCAddress,
  updateConsumerGst,
  updateInvoiceNode,
} from "../handlers/invoice/function";
import {
  createProductWithName,
  findOwnerProducts,
  updateProductDescription,
  updateProductHsn,
  updateProductPrice,
} from "../handlers/product/functions";
import { updateUserNode } from "../handlers/user/function";
import { sendMessage } from "../handlers/whatsapp/sendMessage";
import iWebhookList from "../types/whatsapp/webhook/list";
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

import * as productTemplates from "./product/product";
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
      if (messages[0].type === "interactive") {
        if ((messages[0] as iWebhookReply).interactive.button_reply.id === "invoice") {
          await sendMessage(getCustomerName(), contacts[0].wa_id);
          return await updateUserNode(contacts[0].wa_id, "Inv-cName");
        }
      }
      return await sendMessage(idleMenu(contacts[0].profile.name), contacts[0].wa_id);
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
      if (messages[0].type === "interactive") {
        if ((messages[0] as iWebhookReply).interactive.button_reply.id === "skip_cGst") {
          return await updateInvoiceNode(contacts[0].wa_id, currentNode, toNode);
        }
      } else {
        await updateConsumerGst(contacts[0].wa_id, (messages[0] as iWebhookText).text.body, currentNode, toNode);
      }
      sendMessage(productTemplates.getProductName(), contacts[0].wa_id);
      updateUserNode(contacts[0].wa_id, toNode);
    },
  },
  {
    node: "Inv-pName",
    action: async (body: iWebhook) => {
      const { contacts, messages } = body.entry[0].changes[0].value;
      const toNode = "Inv-pDesc";
      if (messages[0].type === "text") {
        await createProductWithName(messages[0].text.body, contacts[0].wa_id);
        await sendMessage(productTemplates.getProductDescription(), contacts[0].wa_id);
        return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product name in your next message.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
  {
    node: "Inv-pDesc",
    action: async (body: iWebhook) => {
      const { messages, contacts } = body.entry[0].changes[0].value;
      const currentNode = "Inv-pDesc";
      const toNode = "Inv-pPrice";
      if (messages[0].type === "text") {
        await updateProductDescription(messages[0].text.body, contacts[0].wa_id, currentNode, toNode);
        await sendMessage(productTemplates.getProductPrice(), contacts[0].wa_id);
        return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product description in your next message.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
  {
    node: "Inv-pPrice",
    action: async (body: iWebhook) => {
      const { messages, contacts } = body.entry[0].changes[0].value;
      const currentNode = "Inv-pPrice";
      const toNode = "Inv-pHsn";
      if (messages[0].type === "text") {
        await updateProductPrice(messages[0].text.body, contacts[0].wa_id, currentNode, toNode);
        await sendMessage(productTemplates.getProductHsn(), contacts[0].wa_id);
        return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product price in your next message.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
  {
    node: "Inv-pHsn",
    action: async (body: iWebhook) => {
      const { messages, contacts } = body.entry[0].changes[0].value;
      const currentNode = "Inv-pHsn";
      const toNode = "Inv-pAdd";
      if (messages[0].type === "text") {
        const { data } = await updateProductHsn(messages[0].text.body, contacts[0].wa_id, currentNode);
        await sendMessage(productTemplates.addCreatedProductToInvoice(data.name, data._id), contacts[0].wa_id);
        return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product hsn in your next message.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
  {
    node: "Inv-pAdd",
    action: async (body: iWebhook) => {
      const { messages, contacts } = body.entry[0].changes[0].value;
      const currentNode = "Inv-pAdd";
      const toNode = "Inv-pQuantity";
      if (messages[0].type === "interactive") {
        const productId = (messages[0] as iWebhookReply).interactive.button_reply.id;
        await addProductToInvoice(contacts[0].wa_id, currentNode, toNode, productId);
        await sendMessage(productTemplates.addProductQuantity(), contacts[0].wa_id);
        return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product quantity in your next message.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
  {
    node: "Inv-pQuantity",
    action: async (body: iWebhook) => {
      const { messages, contacts } = body.entry[0].changes[0].value;
      const currentNode = "Inv-pQuantity";
      const toNode = "Inv-pMenu";
      if (messages[0].type === "text") {
        await addProductQuantity(contacts[0].wa_id, currentNode, toNode, messages[0].text.body);
        const { data } = await findOwnerProducts(contacts[0].wa_id);
        await sendMessage(productTemplates.sendOwnerProducts(data), contacts[0].wa_id);
        return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product quantity in your next message.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
  {
    node: "Inv-pMenu",
    action: async (body: iWebhook) => {
      const { messages, contacts } = body.entry[0].changes[0].value;
      const currentNode = "Inv-pMenu";
      const toNode = "Inv-pMenu";
      if (messages[0].type === "interactive") {
        if ((messages[0] as iWebhookReply).interactive.button_reply.id === "getInvoice") {
          return sendMessage(customMessageTemplate("sending invoice"), contacts[0].wa_id);
        }
        const productId = (messages[0] as iWebhookList).interactive.list_reply.id;
        await addProductToInvoice(contacts[0].wa_id, currentNode, toNode, productId);
        const response = await findOwnerProducts(contacts[0].wa_id);
        const products = response.data;
        await sendMessage(productTemplates.sendOwnerProducts(products), contacts[0].wa_id);
        await sendMessage(productTemplates.doneCreatingProducts(), contacts[0].wa_id);
        // return await updateUserNode(contacts[0].wa_id, toNode);
      } else {
        const text = "sorry we did'nt understood that we are looking for product from above menu in your next reply.";
        return await sendMessage(customMessageTemplate(text), contacts[0].wa_id);
      }
    },
  },
];
