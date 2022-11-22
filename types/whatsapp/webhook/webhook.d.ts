import iWebhookList from "./list";
import iWebhookReply from "./reply";
import iWebhookText from "./text";

export default interface iWebhook {
  object: "whatsapp_business_account";
  entry: [
    {
      id: string;
      changes: {
        value: {
          messaging_product: "whatsapp";
          metadata: {
            display_phone_number: number;
            phone_number_id: number;
          };
          contacts: {
            profile: {
              name: string;
            };
            wa_id: number;
          }[];
          messages: iWebhookText[] | iWebhookReply[] | iWebhookList[];
        };
        field: "messages" | "reaction";
      }[];
    }
  ];
}
