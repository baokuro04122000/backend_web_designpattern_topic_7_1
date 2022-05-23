import ProductModel from "../models/productModel"

export class Context {
 private strategy:StrategyProduct
 
 constructor(strategy:StrategyProduct){
   this.strategy = strategy
 }

 public setStrategy(strategy:StrategyProduct){
   this.strategy = strategy
 }
 public doLogicSorting(data:any):any{
  const result = this.strategy.doAlgorithm(data)
  return result
 }
}
export interface StrategyProduct{
  doAlgorithm(data:any):any
}
export class ConcreteStrategySortProduct implements StrategyProduct{
  doAlgorithm(data: any) {
    return data.sort()
  }
}
export class ConcreteStrategyReverseProduct implements StrategyProduct{
  doAlgorithm(data: any) {
    return data.reverse()
  }
}