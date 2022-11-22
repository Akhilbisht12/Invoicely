export const sendMessage = async (template: any, recipient: number) => {
  const url = `https://graph.facebook.com/v15.0/${process.env.PHONE_NUMBER_ID}/messages`;
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    ...template,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${process.env.WA_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
