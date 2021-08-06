export type ProductProps = {
  id: number;
  categoryId: number;
  name: string;
  active: boolean;
};

export type OrderProductsProps = {
  id: number;
  categoryId?: number;
  product: string;
  productAmount: number;
};

export type OrdersProps = {
  id: number;
  routeId?: number | null;
  client: string;
  payment: 'Pendente' | 'Ok' | 'Receber';
  valueToReceive?: string | null;
  delivered: boolean;
  products: OrderProductsProps[];
};

export type RouteProps = {
  id: number;
  name: string;
  date: string;
  totalDelivers: number;
};