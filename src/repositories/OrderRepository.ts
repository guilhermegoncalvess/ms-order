import { Collection, ObjectId } from 'mongodb';
import { OrderInterface } from '../interfaces/Order';
import { databaseClient } from '../database/index';
import Produtc from '../entities/Product';
import AppError from '../errors/AppError';

class OrderRepository implements OrderInterface {
  private readonly collection: Collection<Produtc>;

  constructor() {
    this.collection = databaseClient.db('order').collection('orders');
  }

  public async insert({ user, products, totalPrice }: any): Promise<any> {
    const order: any = {
      user,
      products,
      totalPrice,
    };

    await this.collection.insertOne(order);

    return order;
  }

  public async findAll(): Promise<Produtc[]> {
    return this.collection.find<Produtc>({}).toArray();
  }

  public async findById(id: string): Promise<Produtc> {
    const orderId = new ObjectId(id);
    const order = await this.collection.findOne<Produtc>({
      _id: orderId,
    });

    if (!order) throw new AppError('could not find the order.', 404);

    return order;
  }

  public async remove(id: string): Promise<any> {
    const orderId = new ObjectId(id);
    await this.collection.findOneAndDelete({
      _id: orderId,
    });

    return { message: 'order removed' };
  }
}
export default OrderRepository;
