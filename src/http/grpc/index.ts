import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const DEFAULT_RPC_CONFS = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
};

const userLoader = protoLoader.loadSync(
  path.resolve(path.join(__dirname, 'user.proto')),
  DEFAULT_RPC_CONFS,
);

const productLoader = protoLoader.loadSync(
  path.resolve(path.join(__dirname, 'product.proto')),
  DEFAULT_RPC_CONFS,
);

/* eslint-disable*/
const User = grpc.loadPackageDefinition(userLoader).UserService;
const Product = grpc.loadPackageDefinition(productLoader).ProductService

export default {
  // @ts-ignore
  user: new User('localhost:50051', grpc.credentials.createInsecure()),
  // @ts-ignore
  product: new Product('localhost:50052', grpc.credentials.createInsecure()),
};
