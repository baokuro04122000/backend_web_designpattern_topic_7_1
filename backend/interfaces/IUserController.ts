import {Request, Response} from 'express'
export interface ILoginController{
  signInController(req:Request, res:Response):void
  registerController(req:Request, res:Response):void
}