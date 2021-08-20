import { Router } from 'express';

import ProductsController from './Controllers/ProductsController';
import OrdersController from './Controllers/OrdersController';
import DeliversController from './Controllers/DeliversController';
import RoutesController from './Controllers/RoutesController';

const routes = Router();

routes.get('/products', ProductsController.index);
routes.get('/products/all', ProductsController.showAll);
routes.post('/products', ProductsController.create);
routes.put('/products/:id', ProductsController.update)

routes.post('/orders', OrdersController.create);
routes.put('/orders/:id', OrdersController.update);
routes.put('/orders/:id/setDeliverStatus', OrdersController.setDeliverStatus);
routes.delete('/orders/:id', OrdersController.delete);

routes.get('/delivers', DeliversController.index);

routes.get('/routes', RoutesController.index);
routes.get('/routes/:id/orders', RoutesController.showOrders);
routes.get('/routes/:id/summary', RoutesController.summary);
routes.post('/routes', RoutesController.create);
routes.put('/routes/:id', RoutesController.update);
routes.put('/routes/:id/finished', RoutesController.setFinished);

export default routes;