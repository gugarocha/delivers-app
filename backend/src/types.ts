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
  categoryId: number;
  productAmount: number;
  orderId?: number;
};

export enum CategoryEnum {
  Sacarias = 1,
  Águas,
  Mercadorias
}