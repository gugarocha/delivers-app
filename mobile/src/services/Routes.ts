import api from "./api";

import { RouteProps } from "../utils/types";

export async function getRoutes() {
  const response = await api.get('/routes');

  const routes: RouteProps[] = response.data;

  return routes;
};

interface NewRouteProps {
  date: Date;
  name: string;
};
export async function newRoute({ date, name }: NewRouteProps) {
  try {
    const routeInfo = { date, name };

    const { data } = await api.post('/routes', routeInfo);

    return {
      id: data.id[0],
      date: String(date),
      name
    };
  } catch (error) {
    throw new Error(error);
  };
};

interface EditRouteProps {
  routeId: number;
  date: Date;
  name: string;
};
export async function editRouteInfo({ routeId, date, name }: EditRouteProps) {
  try {
    const data = { date, name };

    await api.put(`/routes/${routeId}`, data);
  } catch (error) {
    throw new Error(error);
  };
};