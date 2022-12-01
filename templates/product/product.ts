export const getProductName = () => {
  return {
    type: "text",
    text: {
      body: "Great! we are finally a step away from adding a product. Reply with your PRODUCT NAME in your next message. Remember this will be saved for future invoice, so send name accordingly. After this you'll be asked to enter product description where you can add details about the product. SEND PRODUCT NAME",
    },
  };
};

export const getProductDescription = () => {
  return {
    type: "text",
    text: {
      body: "few more steps, lets add PRODUCT DESCRIPTION",
    },
  };
};

export const getProductPrice = () => {
  return {
    type: "text",
    text: {
      body: "Almost there, lets add PRODUCT PRICE",
    },
  };
};

export const getProductHsn = () => {
  return {
    type: "text",
    text: {
      body: "Pheew!!, finally last step, send PRODUCT HSN NO. in your next message.",
    },
  };
};

export const addCreatedProductToInvoice = (name: string, id: string) => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `Great you have created a product successfully, lets add that to you invoice, tab on ADD PRODUCT to add ${name} on the invoice`,
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: `ADD-${id}`,
              title: "ADD PRODUCT",
            },
          },
        ],
      },
    },
  };
};

export const addProductQuantity = () => {
  return {
    type: "text",
    text: {
      body: "congrats!, lets add the quantity of the product you just added",
    },
  };
};

export const sendOwnerProducts = (products: any) => {
  return {
    type: "interactive",
    interactive: {
      type: "list",
      body: {
        text: "Here's the list of products you have in your inventory, please select one by one to add to your invoice",
      },
      footer: {
        text: "Tab on product to add it on invoice",
      },
      action: {
        button: "Product List",
        sections: [
          {
            title: "Products List",
            rows: products.map((item: any) => {
              return {
                id: item._id,
                title: item.name.subString(0, 24),
                description: item.description.subString(0, 72),
              };
            }),
          },
        ],
      },
    },
  };
};

export const doneCreatingProducts = () => {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "If you have added all the products to your invoice press this button we'll send the invoice to you.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "get_invoice",
              title: "Get Invoice",
            },
          },
        ],
      },
    },
  };
};
