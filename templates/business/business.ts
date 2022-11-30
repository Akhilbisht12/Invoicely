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
              id: "no_gst",
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

export const idleMenu = (name: string) => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `Hello ${name}! Here are the following options you can choose from. Click on INVOICE if wish to create an invoice. If you wish to register one more company with your account you can choose ADD COMPANY option as well.`,
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "add_company",
              title: "ADD COMPANY",
            },
          },
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

export const getCustomerName = () => {
  return {
    type: "text",
    text: {
      body: "Cool! lets, start making the invoice \n Send your CUSTOMER NAME in the your next message",
    },
  };
};

export const getCustomerAddress = () => {
  return {
    type: "text",
    text: {
      body: "Great! you have added the customer name successfull. Lets add CUSTOMER ADDRESS. Reply with customer address in the next message.",
    },
  };
};

export const getCustomerGst = () => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "Good Job! lets, finalize customer details section with CUSTOMER GST. If customer don't have this press skip.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "skip_cGst",
              title: "Skip",
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
