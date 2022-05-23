import mongoose  from 'mongoose';


interface ISeller{
  name:string,
  logo?:string,
  description?:string,
  rating?:number
}

export interface ProductDocument extends mongoose.Schema{
  _id:mongoose.Schema.Types.ObjectId,
  name: string,
  password: string,
  image:string,
  brand:string,
  price:number,
  category:string,
  countInStock:number,
  numReviews:number,
  seller:ISeller,
  createdAt: Date,
  updatedAt: Date,
}
  

const reviewSchema = new mongoose.Schema(
  {
      name:{type:String,required:true},
      comment:{type:String,required:true},
      rating:{type:Number,required:true}
  },
  {
      timestamps:true
  }
)
export const ProductSchema = new mongoose.Schema({
  name:{type:String, required:true},
  seller:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  image:{type:String, required:true},
  brand: {type:String, required:true},
  category:{type:String, required:true},
  description:{type:String, required: true},
  price: {type:Number, required:true},
  countInStock:{type:Number, required:true},
  rating:{type:Number, required:true},
  numReviews: {type:Number, required:true},
  reviews:[reviewSchema]
  },
  {
    timestamps:true
  }
);
ProductSchema.statics = {
  getProducts(filterCondition,sortOrder,pageSize,page){
      return this.find(filterCondition)
      .populate('seller','seller.name')
      .sort(sortOrder)
      .skip(pageSize*(page-1))
      .limit(pageSize)
      .exec();
  },
  getCategories(){
      return this.find({}).distinct('category').exec();
  },
  getProductById(id){
      return this.findOne({"_id":id}).populate('seller').exec();
  },
  createProduct(product){
      return this.create(product);
  },
  updateProduct(productId,newProduct){
      return this.findOneAndUpdate({"_id":productId},newProduct).exec();
  },
  deleteProductById(productId){
      return this.findOneAndDelete({"_id":productId}).exec() ;
  },
  countFilter(filter){
      return this.countDocuments(filter).exec();
  }
}


const Product = mongoose.model('Product',ProductSchema);
export default Product;