import {Request, Response} from 'express'
import { GetAllFactory } from "../helpers/getAllFactory"
import ProductModel from '../models/productModel'
import {Context, ConcreteStrategySortProduct, ConcreteStrategyReverseProduct, StrategyProduct} from '../helpers/strategyProduct'
import {Leaf, clientCode, Composite, clientCode2} from '../helpers/compositeProduct'
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
  async testCompositeProduct(req: Request, res:Response){
    try {
      const products = await ProductModel.find({}).populate('seller', 'seller.name').exec()
      
      
const simple = new Leaf(products[0].seller);
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf(products[1].seller));
branch1.add(new Leaf(products[2].seller));
const branch2 = new Composite();
branch2.add(new Leaf(products[3].seller));
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');
console.log('Client: I don\'t need to check the components classes even when managing the tree:');
;




      res.send(clientCode2(tree, simple))
    } catch (error) {
      res.status(404).send(error)
    }
  }
}