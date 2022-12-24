import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://db-catalog:8IdhVFEd6Xv6MIL5@cluster0.wgj29k0.mongodb.net/?retryWrites=true&w=majority`;

const databaseClient = new MongoClient(uri, {
  auth: {
    username: 'db-catalog',
    password: '8IdhVFEd6Xv6MIL5',
  },
});

async function run() {
  try {
    // Connect the client to the server
    await databaseClient.connect();

    // Create index
    // Establish and verify connection
    // await databaseClient.db('admin').command({ ping: 1 })
    console.log('MongoDB Connected successfully to server');
  } catch (error: any) {
    console.log('MongoDB Error: ', error);
  }
}

run();

export { databaseClient };
