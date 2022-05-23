import { ProductActionService } from "../services/productsService"

export interface CommandProduct{
  excute():any
}

export class CreateProductCommand implements CommandProduct{
  private productActionService: ProductActionService
  private product:object
  constructor(product:object){
    this.productActionService = ProductActionService.getInstance()
    this.product = product
  }
  excute() {
    return new Promise(async (resolve, reject)=>{
      try {
        const notify =  this.productActionService.createProduct(this.product) 
        resolve(notify)
      } catch (error) {
        reject(error)
      }

    })
  }

}
export class UpdateProductCommand implements CommandProduct{
  private productActionService: ProductActionService
  private product:object
  private productId:any
  constructor(productId:any,product:object){
    this.productActionService = ProductActionService.getInstance()
    this.product = product
    this.productId = productId
  }
  excute() {
    return new Promise(async (resolve, reject)=>{
      try {
        const notify =  this.productActionService.updateProduct(this.productId, this.product) 
        resolve(notify)
      } catch (error) {
        reject(error)
      }

    })
  }
}
