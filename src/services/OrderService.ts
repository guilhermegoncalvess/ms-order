import OrderRepository from "../repositories/OrderRepository";

class OrderService {
  async findByUserId(id: any): Promise<any> {
    const orderRepository = new OrderRepository();

    return orderRepository.findByUserId(id)
  }

  async findAll(): Promise<any> {
    const orderRepository = new OrderRepository();

    return orderRepository.findAll()
  }
}

export default OrderService;
