// items.ts
export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  content: string;
  category: string;
  img_demo?: string;
  link_youtube?: string;
  localImage?: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  localImage: string;
};
