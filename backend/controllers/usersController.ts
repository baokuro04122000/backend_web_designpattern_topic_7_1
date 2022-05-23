import {Request, Response} from 'express';
import {ILoginController} from '../interfaces/IUserController'
import {UserLoginService} from '../services/usersService'
import {BaseProfileBuilder, BaseProfile} from '../helpers/builderProfile'

import {GetAllFactory} from '../helpers/getAllFactory'
export class UserLoginController implements ILoginController{
  
  private static _instance: UserLoginController

  constructor(){
    
  }
  public static getInstance():UserLoginController{
    if(this._instance == null)
      this._instance = new UserLoginController()
    return this._instance
  }
  async signInController(req: Request, res: Response){
    try {
      let userInput:Customer = new CustomerBuilder().withEmail(req.body.email)
                                               .withPassword(req.body.password)
                                               .build()
      const user = await UserLoginService.getInstance().signInService(userInput);
      res.send(user)
    } catch (error) {
      console.log(error)
      res.status(404).send(error)
    }
  }
  async registerController(req: Request, res: Response){
    
    let user:Customer = new CustomerBuilder().withEmail(req.body.email)
                                              .withName(req.body.name)
                                              .withPassword(req.body.password)
                                              .build()
    
    await UserLoginService.getInstance().registerService(user)
    .then(created => {
      res.send(created)
    })
    .catch(error => {
      console.log(error)
      res.status(404).send(error)
    })
   
  }

}

// create customer builder
class CustomerBuilder extends BaseProfileBuilder<Customer, CustomerBuilder>  {
  createObject(): Customer {
      return new Customer()
  }

  getThisPointer(): CustomerBuilder {
      return this
  }

  withEmail(value: string): CustomerBuilder {
      this.object.email = value
      return this
  }
  withPassword(value: string): CustomerBuilder {
    this.object.password = value
    return this
}
}

export class Customer extends BaseProfile {
  email?: string
  password?: string 
}

