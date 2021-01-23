import { Router } from 'express';

import ProductsController from './Controllers/ProductsController';

const routes = Router();

routes.get('/products', ProductsController.index);
routes.post('/products', ProductsController.create);
routes.put('/products/:id', ProductsController.update)

export default routes;