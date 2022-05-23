import {Request, Response} from 'express'
import { GetAllFactory } from "../helpers/getAllFactory"
import ProductModel from '../models/productModel'
import {Context, ConcreteStrategySortProduct, ConcreteStrategyReverseProduct, StrategyProduct} from '../helpers/strategyProduct'
// test get all users from database
export class TestGetAllUsers{
  private static _instance: TestGetAllUsers

  constructor(){
    
  }
  public static getInstance():TestGetAllUsers{
    if(this._instance == null)
      this._instance = new TestGetAllUsers()
    return this._instance
  }
  async test(req: Request, res:Response){
    try {
      const user = GetAllFactory.getInstance().getAllTableFromDatabase('user')
      res.send(await user?.getAll())
    } catch (error) {
      res.status(404).send()
    }
  }
  async testProduct(req: Request, res:Response){
    try {
      const products = await ProductModel.find({}).exec()
      const context = new Context(new ConcreteStrategySortProduct())
      
      //context.setStrategy(new ConcreteStrategyReverseProduct())
      //context.doLogicSorting(products)
      res.send(context.doLogicSorting(products))
    } catch (error) {
      res.status(404).send()
    }
  }
}