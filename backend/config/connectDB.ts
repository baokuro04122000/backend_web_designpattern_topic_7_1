import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from './dotenv';


export default class ConnectDBSingleton {
  private static instance: ConnectDBSingleton;

  
  private constructor() { }

  public static getInstance(): ConnectDBSingleton {
      if (!ConnectDBSingleton.instance) {
        ConnectDBSingleton.instance = new ConnectDBSingleton();
      }

      return ConnectDBSingleton.instance;
  }

  
  public connectDB() {
    mongoose.Promise = bluebird;
    mongoose.connect(dotenv.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false 
    })
  }
}
