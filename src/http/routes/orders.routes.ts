import { Router } from 'express';

import OrderController from '../../controllers/OrderController';

const orderRouter = Router();

orderRouter.post('/', async (request, response) => {
  const orderController = new OrderController();

  const payload = await orderController.insert({
    ...request.body,
    ...request.params,
    ...request.query,
  });

  return response.json(payload);
});

orderRouter.delete('/:id', async (request, response) => {
  // const orderController = new OrderController();
  // const order = await orderController.remove(request);
  // return response.json(order);
});

orderRouter.get('/', async (request, response) => {
  const orderController = new OrderController();

  const order = await orderController.findAll();

  return response.json(order);
});

orderRouter.get('/user/:id', async (request, response) => {
  const orderController = new OrderController();

  const order = await orderController.findByUserId({ ...request.body, ...request.params, ...request.query });

  return response.json(order);
});

// orderRouter.get('/order/:id', async (request, response) => {
//   const orderController = new OrderController();

//   const order = await orderController.findById(request);

//   return response.json(order);
// });

export default orderRouter;
