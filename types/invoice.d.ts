export interface iInvoice {
  consumer: string;
  cName: string;
  cAddress: string;
  cGst: string;
  items: {
    quantity: number;
    product: string;
  }[];
  CGst: string;
  SGst: string;
  node?: string;
  owner: number;
}

export interface iProduct {
  name: string;
  hsn?: string;
  rate: string;
  description: string;
}
