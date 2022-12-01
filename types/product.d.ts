export interface iProduct {
  owner: number;
  name: string;
  description: string;
  category: string[];
  salePrice?: number;
  image?: string;
  shortDescription?: string;
  price: number | string;
  variants?: {
    name: string;
    value: string;
    variables: {
      name: string;
      value: string;
      image?: string;
    };
  }[];
  hsn: string;
  node: string;
}
