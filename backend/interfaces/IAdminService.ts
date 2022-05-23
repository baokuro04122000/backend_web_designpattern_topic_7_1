import { UserDocument } from "../models/userModel";
import mongoose  from 'mongoose';
export interface IGetAllUsersService{
  getAllUserExceptCurrentUser(currentUserID:mongoose.Schema.Types.ObjectId): Promise<Array<UserDocument>>
}