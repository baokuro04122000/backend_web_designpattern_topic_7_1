import UserModel, {UserDocument} from '../models/userModel'
import Message from '../lang/en'
export const checkEmptyString = (str:string):boolean => {
  return (!str || /^\s*$/.test(str));;  
}
export const isEmptyObject = (obj:object):boolean => {
  for(var prop in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
export const userModelFindObjectByEmail = (value:number|string):Promise<UserDocument>=>{
  return new Promise(async (resolve, reject)=>{
    try {
      const userInfo = await UserModel.findOne({email:value})
      resolve(userInfo)  
    } catch (error) {
      reject(Message.FIELD_OF_MODEL_NOT_FOUND)
    }
  }) 
}

export const handlePromise =async (promise: any) => {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}