import { Router } from 'express';

import ProductsController from './Controllers/ProductsController';
import OrdersController from './Controllers/OrdersController';

const routes = Router();

routes.get('/products', ProductsController.index);
routes.get('/products/all', ProductsController.showAll);
routes.post('/products', ProductsController.create);
routes.put('/products/:id', ProductsController.update)

routes.post('/orders', OrdersController.create);
routes.put('/orders/:id', OrdersController.update);
routes.put('/orders/:id/delivered', OrdersController.setDelivered);
routes.delete('/orders/:id', OrdersController.delete);

export default routes;