export interface Order {
  id: number;
  routeId?: number;
  client: string;
  products: OrderProducts[];
  payment: string;
  valueToReceive?: number;
  delivered: boolean;
}

export interface OrderProducts {
  id: number;
  product: string;
  categoryId: number;
  productAmount: number;
  orderId?: number;
};

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  active: boolean;
};

export enum CategoryEnum {
  Sacarias = 1,
  Águas,
  Mercadorias
}