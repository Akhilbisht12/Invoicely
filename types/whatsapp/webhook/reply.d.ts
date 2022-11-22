export default interface iWebhookReply {
  from: number;
  id: string;
  timestamp: string;
  interactive: {
    button_reply: {
      id: string;
      title: string;
    };
    type: "button_reply";
  };
  type: "interactive";
}
