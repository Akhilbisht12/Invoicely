export const onBoarding = (userName: string) => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `Greeting ${userName}! we are glad to see your here, Lets quickly complete few steps to create your first Invoice.\n Step One will be to register your company details for invoicing.`,
      },
      footer: {
        text: "Press Register Company to get started.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "register",
              title: "Register Company",
            },
          },
        ],
      },
    },
  };
};

export const getCompanyName = () => {
  return {
    type: "text",
    text: {
      body: "Step One: Reply with your COMPANY NAME in the next message",
    },
  };
};

export const getCompanyAddress = () => {
  return {
    type: "text",
    text: {
      body: "Congrats! you have completed step one. \n Step 2: Reply with the address of your company. ",
    },
  };
};

export const getCompanyGst = () => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "As a final step, we'll take you COMPANY GST NUMBER, reply with your GST NUMBER in the next message.",
      },
      footer: {
        text: "Press button below, only if you don't have GST Number.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "get_gst",
              title: "I Don't Have GST NO.",
            },
          },
        ],
      },
    },
  };
};

export const companyRegistrationSuccess = () => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "You have successfully registered your company for invoicing, lets Quickly create your first invoice, Press the button below.",
      },
      footer: {
        text: "Press INVOICE to create your first invoice.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "invoice",
              title: "INVOICE",
            },
          },
        ],
      },
    },
  };
};

export const customMessageTemplate = (text: string) => {
  return {
    type: "text",
    text: {
      body: text,
    },
  };
};
