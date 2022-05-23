import { Request, Response } from 'express'
import {AdminService} from '../services/usersService'

import {IGetAllUsersController} from '../interfaces/IAdminController'
export class AdminController implements IGetAllUsersController{
  
  private static _instance: AdminController

  constructor(){
    
  }
  
  public static getInstance():AdminController{
    if(this._instance == null)
      this._instance = new AdminController()
    return this._instance
  }
  async getAllUser(req: Request, res: Response) {
    try {
      res.send(await AdminService.getInstance().getAllUserExceptCurrentUser(res.locals.jwt._id))
    } catch (error) {
      console.log(error)
      res.status(404).send()
    }
  }
}