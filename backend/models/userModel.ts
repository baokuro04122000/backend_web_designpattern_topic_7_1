import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';

interface ISeller{
  name:string,
  logo?:string,
  description?:string,
  rating?:number
}

export interface UserDocument extends mongoose.Schema{
  _id:mongoose.Schema.Types.ObjectId,
  email:string,
  name: string,
  password: string,
  isAdmin:Boolean,
  isSeller:Boolean,
  seller:ISeller,
  createdAt: Date,
  updatedAt: Date,
  comparePassword(candidatePassword: string): Promise<boolean>;
}
 
export interface UserRender extends Pick<UserDocument, '_id'|'email'|'name'|'isAdmin'|'isSeller'|'seller'|'createdAt'|'updatedAt'>{
    token: string
}
export type UserInput = Pick<UserDocument, 'email'|'name'|'password'>


export const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin : {type:Boolean , default: false , required:true},
    isSeller:{type:Boolean,default:false,required:true},
    seller:{
        name:String,
        logo:String,
        description:String,
        rating:Number
    }
    },
    {
        timestamps:true,
    }
);
UserSchema.statics = {
    createUser(item:UserInput){
        return this.create(item);
    },
    findUserByEmail(userEmail:UserDocument['email']){
        return this.findOne({"email":userEmail}).exec();
    },
    findUserById(userId:string){
        return this.findOne({"_id":userId},{seller:1,_id:1,email:1,name:1,isAdmin:1,isSeller:1}).exec();
    },
    getAllUsers(){
        return this.find({}).exec();
    },
    getTopSellers(){
        return this.find({"isSeller":true},{_id:1,seller:1,isSeller:1}).sort({"seller.rating":-1}).exec();
    },
    updateUserById(userId,userChange){
        return this.findOneAndUpdate({"_id":userId},userChange).exec();
    },
    deleteUser(userId){
        return this.findOneAndDelete({"_id":userId}).exec();
    },
    updateUser(userId,newUser){
        return this.findOneAndUpdate({"_id":userId},newUser).exec();
    }
}
UserSchema.methods.comparePassword = 
    async function(password:string){
        //return a promise has result is true or false
        const user = this as unknown as  UserDocument;
        return await bcrypt.compare(password,user.password)
        
    }

const User = mongoose.model('User',UserSchema);
export default User;