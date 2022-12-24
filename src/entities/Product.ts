import { ObjectId } from 'mongodb';

export default interface Produtc {
  _id?: ObjectId;

  name: string;

  description: string;

  value: number;
}
