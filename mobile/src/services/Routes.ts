import api from "./api";

import { RouteProps } from "../utils/types";

export async function getRoutes() {
  const response = await api.get('/routes');

  const routes: RouteProps[] = response.data;
  
  return routes;
};