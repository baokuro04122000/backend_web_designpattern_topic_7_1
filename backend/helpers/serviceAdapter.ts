import {CategoryService} from '../services/productsService'
import {handlePromise} from '../helpers/utilitis'
interface ITarget{
  requestCategory():Promise<string[]>
}

export class ServiceAdapter implements ITarget{
  private static _instance: ServiceAdapter

  constructor(){
    
  }
  
  public static getInstance():ServiceAdapter{
    if(this._instance == null)
      this._instance = new ServiceAdapter()
    return this._instance
  }
  requestCategory():any {
    return new Promise(async (resolve, reject) => {
      const [data, error] = await handlePromise(CategoryService.getInstance().getCategories())
      if(error){
        reject(error)
      }
      let result = new Set()
      data.forEach((element: { category: string }) => {
        result.add(element.category)
      });
      resolve([...result.values()])
    })
  }
}