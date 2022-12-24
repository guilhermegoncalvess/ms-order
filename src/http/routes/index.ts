import { Router } from 'express';

import ordersRouter from './orders.routes';

const routes = Router();

routes.use('/', ordersRouter);

export default routes;
