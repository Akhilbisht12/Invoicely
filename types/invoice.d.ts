export interface iInvoice {
  consumer: string;
  cName: string;
  cAddress: string;
  cGst: string;
  items: {
    name: string;
    hsn?: string;
    quantity: number;
    rate: number;
  }[];
  discount: number;
  CGst: number;
  SGst: number;
}
