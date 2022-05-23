import {UserLoginService} from '../services/usersService'
import ProductModel from '../models/productModel'
export interface Component{
  accept(visitor: Visitor):void
}
export class ConcreteSignInUser implements Component{
  public accept(visitor: Visitor): void {
      visitor.visitConcreteSignInUser(this)
  }

  public userSignIn(userInput: any){
    return new Promise(async (resolve, reject) => {
      try {
        const signIn = await UserLoginService.getInstance().signInService(userInput)
        resolve(signIn)
      } catch (error) {
        reject(error)
      }

    })
  }
}

export class ConcreteGetCategoriesProduct implements Component{
  public accept(visitor: Visitor): void {
      visitor.visitConcreteGetCategoriesProduct(this)
  }
  public getCategoriesProduct(){
    return new Promise(async (resolve, reject) => {
      try {
        const categories = await ProductModel.find({}).distinct('category').exec()
        resolve(categories);  
      } catch (error) {
        reject(error)
      }
    })
  }
}

export interface Visitor{
  visitConcreteSignInUser(element: ConcreteSignInUser):any
  visitConcreteGetCategoriesProduct(element: ConcreteGetCategoriesProduct):any
}

export class ConcreteVisitor implements Visitor{
  private userInput:any
  constructor(userInput: any){
    this.userInput = userInput
  }
  visitConcreteSignInUser(element: ConcreteSignInUser) {
    return new Promise(async(resolve, reject) => {
      try {
        const signIn = await element.userSignIn(this.userInput)
        resolve(signIn)
      } catch (error) {
        reject(error)
      }
    })
  }
  visitConcreteGetCategoriesProduct(element: ConcreteGetCategoriesProduct) {
    return new Promise(async (resolve, reject) => {
      try {
        const getCategories = await element.getCategoriesProduct()
        resolve(getCategories)
      } catch (error) {
        reject(error)
      }
    })
  }
}