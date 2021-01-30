export interface Order {
  id: number;
  routeId?: number;
  client: string;
  products: Product[];
  payment: string;
  valueToReceive?: number;
  delivered: boolean;
}

export interface Product {
  id: number;
  product: string;
  category: string;
  productAmount: number;
  orderId?: number;
};