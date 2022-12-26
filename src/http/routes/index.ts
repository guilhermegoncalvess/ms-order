import { Router } from 'express';

import ordersRouter from './orders.routes';

const routes = Router();

routes.use('/order', ordersRouter);
routes.use('/', async (request, response) => {
  return response.json({});
});

export default routes;
