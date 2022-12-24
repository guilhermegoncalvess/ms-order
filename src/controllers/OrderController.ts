import { PubSub } from '@google-cloud/pubsub';
import path from 'path';
import OrderRepository from '../repositories/OrderRepository';
import rcp from '../http/grpc';

export default class OrderController {
  async insert(payload: any): Promise<any> {
    const { userId, products, totalPrice } = payload;

    const user = await new Promise((resolve: any, reject: any) => {
      rcp.user.GetUser({ id: userId }, (err: any, res: any) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });

    const newProducts = await Promise.all(
      products.map(async (item: any) => {
        const product: any = await new Promise((resolve: any, reject: any) => {
          rcp.product.GetProduct({ id: item.id }, (err: any, res: any) => {
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

    const pubSubClient = new PubSub({
      keyFile: path.join(__dirname, 'pubsub.json'),
    });
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
    // const topicNameOrId = 'projects/learning-357114/topics/pedidos';
    // const data = JSON.stringify(order);
    console.log(path.join(__dirname, 'pubsub.json'));
    const pubSubClient = new PubSub({
      keyFile: path.join(__dirname, 'pubsub.json'),
    });
    // const dataBuffer = Buffer.from(data);

    const subscription = pubSubClient.subscription(
      'projects/learning-357114/subscriptions/order-sub',
    );

    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = (message: any) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;

      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
    return {};
  }

  async findById(payload: any): Promise<any> {
    const { id } = payload.params;
    return new Promise((resolve: any, reject: any) => {
      rcp.user.GetUser({ id }, (err: any, res: any) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  async remove(): Promise<any> {
    return {};
  }
}
