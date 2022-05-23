import {Request, Response} from 'express'
export interface IGetAllUsersController{
  getAllUser(req:Request, res:Response):void
}