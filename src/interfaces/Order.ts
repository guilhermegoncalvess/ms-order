export interface OrderInterface {
  insert(produtc: any): Promise<any>;
  findAll(): Promise<any[]>;
  findByUserId(id: string): Promise<any>;
}
