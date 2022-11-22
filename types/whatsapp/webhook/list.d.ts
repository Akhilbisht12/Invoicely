export default interface iWebhookList {
  from: number;
  id: string;
  timestamp: string;
  interactive: {
    list_reply: {
      id: string;
      title: string;
      description: string;
    };
    type: "list_reply";
  };
  type: "interactive";
}
