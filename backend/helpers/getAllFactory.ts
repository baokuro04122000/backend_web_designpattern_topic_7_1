import UserModel from '../models/userModel'
interface GetAllTableFromDatabase{
  getAll<T>():Promise<Array<T>>
}

class GetAllUser implements GetAllTableFromDatabase{
  
  getAll<UserDocument>(): Promise<Array<UserDocument>> {
    return new Promise(async (resolve, reject)=>{
      try {
        const users = await UserModel.find({}).exec()
        console.log(users)
        resolve(users)
      } catch (error) {
        reject(error)
      }
    }) 
  }
}
export class GetAllFactory{
  private static _instance: GetAllFactory

  constructor(){
    
  }
  public static getInstance():GetAllFactory{
    if(this._instance == null)
      this._instance = new GetAllFactory()
    return this._instance
  }
  getAllTableFromDatabase(tableName : string): GetAllTableFromDatabase | null{
    if(tableName.toLowerCase() === "user"){
      const table:GetAllTableFromDatabase = new GetAllUser()
      return table
    }
    return null
  }
}
