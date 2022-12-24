import { Router } from 'express';

import OrderController from '../../controllers/OrderController';

const orderRouter = Router();

orderRouter.post('/order', async (request, response) => {
  const orderController = new OrderController();

  const payload = await orderController.insert({
    ...request.body,
    ...request.params,
    ...request.query,
  });

  return response.json(payload);
});

orderRouter.delete('/order/:id', async (request, response) => {
  // const orderController = new OrderController();
  // const order = await orderController.remove(request);
  // return response.json(order);
});

orderRouter.get('/order/', async (request, response) => {
  const orderController = new OrderController();

  const order = await orderController.findAll();

  return response.json(order);
});

// orderRouter.get('/order/:id', async (request, response) => {
//   const orderController = new OrderController();

//   const order = await orderController.findById(request);

//   return response.json(order);
// });

export default orderRouter;
