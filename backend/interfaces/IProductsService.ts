import {ProductDocument} from '../models/productModel'

export enum sortOrder{
  lowest='lowest',
  highest='highest',
  toprated='toprated'
}
export interface IFilterService extends ICountFilter{
  getProducts(filterCondition:Object, sortOrder:object, pageSize:number, page:Number):Promise<ProductDocument>
}
export interface ICountFilter{
  countFilter(filter:Object):Promise<number>
}
export interface ICategoryService{
  getCategories():Promise<[]>
}
export interface IActionProductService extends ICreateProductService, IUpdateProductService{

}
export interface ICreateProductService{
  createProduct(product:object):Promise<string>
}

export interface IUpdateProductService{
  updateProduct(productId:any ,newProduct:object):Promise<string>
}