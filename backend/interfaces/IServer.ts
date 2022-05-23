import { Server } from "socket.io";
export interface ICreateServer{
  
  middlewareApp():void;
  connectRoutes():void;
  createHost(port:number):void;
}
export interface IConnectDB{
  connectDB():void;
}
export interface IConnectSocket{
  connectIO(io:Server):void;
}