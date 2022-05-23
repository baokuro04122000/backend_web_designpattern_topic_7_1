import {UserRender} from '../models/userModel'
import {UserInput} from '../models/userModel'
export interface ILoginService{
  signInService(user:UserInput):Promise<UserRender>
  registerService(user:UserInput):Promise<string|number>
}