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
  ghanaian_size:String;
  retail_cost:String,
  shoe_status:[String],
  item_number:String

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
