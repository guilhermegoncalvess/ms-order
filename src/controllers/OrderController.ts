import { PubSub } from '@google-cloud/pubsub';
import OrderRepository from '../repositories/OrderRepository';
import rpc from '../http/grpc';
import OrderService from '../services/OrderService';

export default class OrderController {
  async insert(payload: any): Promise<any> {
    const { userId, products, totalPrice } = payload;

    const user = await new Promise((resolve: any, reject: any) => {
      rpc.user.GetUser({ id: userId }, (err: any, res: any) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });

    const newProducts = await Promise.all(
      products.map(async (item: any) => {
        const product: any = await new Promise((resolve: any, reject: any) => {
          rpc.product.GetProduct({ id: item._id }, (err: any, res: any) => {
            if (err) return reject(err);
            return resolve(res);
          });
        });

        return { ...product, quantity: item.quantity };
      }),
    );

    const order = { user, products: newProducts, totalPrice };
    const orderRepository = new OrderRepository();
    const orderResult = await orderRepository.insert(order);

    const topicNameOrId = 'projects/learning-357114/topics/order';
    const data = JSON.stringify(orderResult);

    const pubSubClient = new PubSub();
    const dataBuffer = Buffer.from(data);

    try {
      const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published at ${new Date()}`);
    } catch (error: any) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }

    return orderResult;
  }

  async findAll(): Promise<any> {
    const orderService = new OrderService()

    return orderService.findAll()
  }

  async findByUserId(payload: any): Promise<any> {
    const { id } = payload
    const orderService = new OrderService()

    return orderService.findByUserId(id)
  }
}
