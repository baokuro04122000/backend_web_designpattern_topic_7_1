import {Request, Response} from 'express'
export interface IFilterController {
  getProducts(req: Request, res:Response):void
}
export interface IGetCategory{
  getCategories(req: Request, res:Response):void
}
export interface IActionProduct extends ICreateProduct, IUpdateProduct{

}
export interface ICreateProduct{
  createProduct(req: Request, res:Response):void
}

export interface IUpdateProduct{
  updateProduct(req: Request, res:Response):void
}