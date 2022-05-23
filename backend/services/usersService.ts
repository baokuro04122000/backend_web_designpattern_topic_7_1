import {ILoginService} from '../interfaces/IUserService'
import UserModel,{  UserDocument, UserRender} from '../models/userModel'
import {userModelFindObjectByEmail, handlePromise} from '../helpers/utilitis'
import {Customer} from '../controllers/usersController'
import Message from '../lang/en'
import env from '../config/dotenv'
import bcrypt from 'bcrypt';
import { GetAllFactory } from '../helpers/getAllFactory'
import { IGetAllUsersService } from '../interfaces/IAdminService'
import mongoose  from 'mongoose';
import _ from 'lodash'
import {IRemove, RemoveUserFromListUsersByID} from '../helpers/arrayProcessing'
import {generateToken} from '../config/jwt'

export class UserLoginService implements ILoginService{
  private static _instance: UserLoginService

  constructor(){
    
  }
  public static getInstance():UserLoginService{
    if(this._instance == null)
      this._instance = new UserLoginService()
    return this._instance
  }
  public signInService(user:Customer):Promise<UserRender>{
    return new Promise(async (resolve, reject)=>{
        const [userInfo, error] = await handlePromise(userModelFindObjectByEmail(user.email ? user.email : ""))
        if(error){
          reject(error)
        }
        
        const [correct] = await handlePromise(userInfo.comparePassword(user.password ? user.password : ""))
        
        if(!correct){
          reject(Message.FIELD_OF_MODEL_NOT_FOUND)
        }
       
        generateToken(userInfo, (error, token)=> {
          if(error){
            reject(error)
          }
          const userRender:UserRender = {
            _id: userInfo._id,
            email: userInfo.email,
            isAdmin: userInfo.isAdmin,
            isSeller: userInfo.isSeller,
            seller: {
              name: userInfo.seller.name
            },
            createdAt: userInfo.createdAt,
            updatedAt: userInfo.createdAt,
            name: userInfo.name,
            token:token ? token : ''
          }
          resolve(userRender)

        })
        
        
    })
  }
  public registerService(user:Customer):Promise<string|number>{
    return new Promise(async (resolve, reject)=>{
      try {
        const userInfo = await UserModel.findOne({"email":user.email})
        if(!userInfo){
          try {
            // Random additional data
            const salt = await bcrypt.genSalt(env.SALT_WORK_FACTOR);

            const hash = await bcrypt.hashSync(user.password, salt);
          
            // Replace the password with the hash
            user.password = hash;
            
            await UserModel.create(user).then(()=>
              resolve(Message.USER_REGISTER_SUCCESS)
            ).catch(e => reject(e))
            
          } catch (error) {
            reject(error)
          }
        }

      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}

export class AdminService implements IGetAllUsersService{
  private static _instance: AdminService

  constructor(){
    
  }
  public static getInstance():AdminService{
    if(this._instance == null)
      this._instance = new AdminService()
    return this._instance
  }
  getAllUserExceptCurrentUser(currentUserID:mongoose.Schema.Types.ObjectId): Promise<Array<UserDocument>> {
    return new Promise(async (resolve, reject)=>{
      const user = GetAllFactory.getInstance().getAllTableFromDatabase('user')
      const [users, error] = await handlePromise(user?.getAll)
      if(error){
        reject(Message.SYSTEM_ERROR)
      }
      const dataProcessing:IRemove = new RemoveUserFromListUsersByID()

      const data = dataProcessing.remove(users,currentUserID)
      
      console.table(user)

    })

  }
}

