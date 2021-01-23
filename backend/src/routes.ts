import { Router } from 'express';

import ProductsController from './Controllers/ProductsController';

const routes = Router();

routes.get('/products', ProductsController.index);

export default routes;