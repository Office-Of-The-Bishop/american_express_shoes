export interface Product {
  id?: string;
  name: string;
  price: number;
  images?: [string];
  description: string;
  quantity: number;
  gender: [string];
  shoeType: [string];
  AmericanSize:String;
  GhanaianSize:String;
  retailCost:String,
  shoeStatus:[String],
  itemNumber:String

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
