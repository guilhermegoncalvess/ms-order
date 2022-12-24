export interface OrderInterface {
  insert(produtc: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any>;
}
