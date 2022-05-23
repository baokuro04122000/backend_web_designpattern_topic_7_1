import {IFilterService, ICategoryService, IActionProductService} from '../interfaces/IProductsService'
import ProductModel,{ ProductDocument } from '../models/productModel'
import Message from '../lang/en'
export class ProductService implements IFilterService{
  
  private static _instance: ProductService

  constructor(){
    
  }
  
  public static getInstance():ProductService{
    if(this._instance == null)
      this._instance = new ProductService()
    return this._instance
  }
  
  getProducts(filterCondition: Object, sortOrder: object, pageSize: number, page: number): Promise<ProductDocument> {
      return new Promise(async (resolve, reject) => {
        try {
          const products = await ProductModel.find(filterCondition)
          .populate('seller','seller.name')
          .sort(sortOrder)
          .skip(pageSize*(page-1))
          .limit(pageSize)
          .exec();
          resolve(products)
        } catch (error) {
          reject(error);
        }
      })
  }
  countFilter(filter: Object): Promise<number> {
      return new Promise(async (resolve, reject)=>{
        try {
          const count = await ProductModel.countDocuments(filter).exec()
          resolve(count)
        } catch (error) {
          reject(error)
        }
      })
  }
}
export class CategoryService implements ICategoryService{
  private static _instance: CategoryService

  constructor(){
    
  }
  
  public static getInstance():CategoryService{
    if(this._instance == null)
      this._instance = new CategoryService()
    return this._instance
  }
  getCategories():Promise<[]>{
    return new Promise(async (resolve, reject)=> {
      try {
        const categories = await ProductModel.find({}).select('category').exec()
        resolve(categories);  
      } catch (error) {
        reject(error)
      }
    })
  }
}
export class ProductActionService implements IActionProductService{
  private static _instance: ProductActionService

  constructor(){
    
  }
  
  public static getInstance():ProductActionService{
    if(this._instance == null)
      this._instance = new ProductActionService()
    return this._instance
  }

  createProduct(product: object): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const created = await ProductModel.create(product)
        resolve(Message.CRETAE_PRODUCT_SUCCESS); 
      } catch (error) {
        reject(error)
      }
    })
  }
  updateProduct(productId: any,newProduct: object): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const created = await ProductModel.findOneAndUpdate({"_id":productId},newProduct).exec()
        resolve(Message.CRETAE_PRODUCT_SUCCESS);
      } catch (error) {
        reject(error)
      }
    })
  }
}