export interface Product {
  id?: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  quantity: number;
  gender: string;
  shoeType: string;
}

export interface CartItem extends Product {
  id: string;
}

export interface OrderInfo {
  name: string;
  phone: string;
  items: CartItem[];
  total: number;
  orderId: string;
  date: string;
}
