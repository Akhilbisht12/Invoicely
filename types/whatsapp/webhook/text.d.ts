export default interface iWebhookText {
  from: number;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: "text";
}
