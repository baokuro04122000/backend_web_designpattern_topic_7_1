import _ from 'lodash'
import mongoose from 'mongoose'
type T = any
export interface IRemove{
  remove(array:Array<T>, predicate:mongoose.Schema.Types.ObjectId):Array<T>
}

export class RemoveUserFromListUsersByID implements IRemove{
  remove(array: any[], predicate: mongoose.Schema.Types.ObjectId): any[] {
    return _.remove(array, (item)=> item._id == predicate)
  }
  
}

