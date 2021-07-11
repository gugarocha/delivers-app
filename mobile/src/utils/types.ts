export type OrderProductsProps = {
  id: number;
  categoryId: number;
  product: string;
  productAmount: number;
};

export type OrdersProps = {
  id: number;
  routeId?: number | null;
  client: string;
  payment: 'Pendente' | 'Ok' | 'Receber';
  valueToReceive: string | null;
  delivered: boolean;
  products: OrderProductsProps[];
};