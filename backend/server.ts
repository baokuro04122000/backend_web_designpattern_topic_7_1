
import {ICreateServer, IConnectDB} from './interfaces/IServer';

import InitRoute from './routes/web'
import express, {Express} from 'express';

import connectDB from './config/connectDB'

import log from './logger/index';
import dotenv from 'dotenv';
import env from './config/dotenv'
dotenv.config();
class Server implements ICreateServer, IConnectDB{
  private app:Express

  constructor(){
    this.app = express()
  }
  
  middlewareApp(): void {
   this.app.use(express.json())
   this.app.use(express.urlencoded({ extended: false }))
  }
  connectDB(): void {
    const connect:connectDB = connectDB.getInstance()
    connect.connectDB()
  }
  connectRoutes(): void {
    const initRoutes:InitRoute = new InitRoute(this.app)
    initRoutes.runRoutes();
  }
  createHost(port:number): void {
    this.app.listen(port,()=>{
      log.info(`Server listing at http://localhost:${port}`)
    })
  }
}

class ServerFacade{
  private static _instance:ServerFacade
  private server:Server
  constructor(){
    this.server = new Server()
  }
  public static getInstance():ServerFacade{
    if(this._instance == null)
      this._instance = new ServerFacade()
    return this._instance
  }
  public createServer(){
    this.server.middlewareApp()
    this.server.connectRoutes()
    this.server.connectDB()
    this.server.createHost(env.PORT)
  }

}

ServerFacade.getInstance().createServer()
