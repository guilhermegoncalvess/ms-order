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
    return this.collection.find({}).toArray();
  }

  public async findByUserId(id: string): Promise<Produtc[]> {
    const orders = await this.collection.find<Produtc>({
      'user.id': id,
    });

    return orders.toArray();
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
