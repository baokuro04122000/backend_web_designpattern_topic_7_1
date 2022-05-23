import { Request, Response } from 'express'
import {IFilterController, IGetCategory, IActionProduct} from '../interfaces/IProductController'
import {ProductService} from '../services/productsService'
import {ServiceAdapter} from '../helpers/serviceAdapter'
import {CreateProductCommand, UpdateProductCommand, CommandProduct} from '../helpers/commandProduct'
import {ConcreteVisitor, ConcreteGetCategoriesProduct} from '../helpers/visitor'
export class ProductController implements IFilterController, IGetCategory {
  private static _instance: ProductController

  constructor(){
    
  }
  
  public static getInstance():ProductController{
    if(this._instance == null)
      this._instance = new ProductController()
    return this._instance
  }

  async getProducts(req: Request, res: Response) {
    const pageSize = 6;
    const page:number = req.query.pageNumber ? +req.query.pageNumber: 1;    
    const name:string =req.query.name ? String(req.query.name): '';
    const seller:string = req.query.seller?String(req.query.seller) :'';
    const category:string = req.query.category ?String(req.query.category): '';
    const order:string = req.query.order ? String(req.query.order): '';
    const min:Number = req.query.min && +req.query.min !== 0 ? +req.query.min : 0;
    const max:Number = req.query.max && +req.query.max !== 0 ? +req.query.max : 0;
    const rating:Number = req.query.rating && +req.query.rating !== 0 ? +req.query.rating : 0;

    const sellerFilter:Object = seller ? {seller} : '';
    const nameFilter:object =  name !== 'all' ? { name : { $regex : name, $options:'i'}} : {};
    const categoryFilter:object = category ? {category} : {};
    const priceFilter:object = min && max ? {price:{$gte : min, $lte : max}} : {};
    const ratingFilter:object = rating ? { rating : { $gte : rating }} : {};
    const sortOrder:object = order === 'lowest' 
                    ? {price:1}
                    : order==='highest'
                    ?  {price:-1}
                    : order === 'toprated'
                    ? {rating:-1}
                    : {_id:-1};

  try{
    const count = await ProductService.getInstance().countFilter({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter
    })

    const products = 
    await ProductService.getInstance().getProducts(
      {
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter
      },
      sortOrder,pageSize,page);
      res.send({products,page,pages:Math.ceil(count/pageSize)});
    }catch(err){
        res.send({error:err})
    }
  }

  async getCategories(req: Request, res: Response){
    // try {
    //   const categories = await ServiceAdapter.getInstance().requestCategory()
    //   res.send(categories)
    // } catch (error) {
    //   res.status(402).send(error)
    // }
    
    //test visitor
    const visitor = new ConcreteVisitor({})
    const concreteGetCategoriesProduct = new ConcreteGetCategoriesProduct()
    concreteGetCategoriesProduct.accept(visitor)
    try {
      const catagories = await concreteGetCategoriesProduct.getCategoriesProduct()
      res.send(catagories)
    } catch (error) {
      res.status(402).send(error)
    }
    
  }
}

export class ProductActionController implements IActionProduct{
  private static _instance: ProductActionController

  constructor(){
    
  }
  
  public static getInstance():ProductActionController{
    if(this._instance == null)
      this._instance = new ProductActionController()
    return this._instance
  }
  async createProduct(req: Request, res: Response){
    let productSent={
      name:req.body.name,
      seller:'60a344e561933a580cdc49a8',
      image:req.body.image,
      price:req.body.price,
      category:req.body.category,
      brand:req.body.brand,
      countInStock:req.body.countInStock,
      rating:0,
      numReviews:0,
      description:req.body.description
  };
  try {
      const createCommand:CommandProduct = new CreateProductCommand(productSent)
      const createdProduct = await createCommand.excute();
      res.send({message:createdProduct})
  } catch (error) {
       res.status(401).send({message:error})   
  }
  }
  async updateProduct(req: Request, res: Response) {
    const productId = req.params.id;
    const newProduct = {
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        category:req.body.category,
        countInStock:req.body.countInStock,
        brand:req.body.brand,
        description:req.body.description
    }
    try {
        const updateCommand:CommandProduct = new UpdateProductCommand(productId, newProduct)
        const updatedProduct = await updateCommand.excute();
        res.send(updatedProduct);
    } catch (error) {
        res.status(401).send({message:error})
    }
  }
  
}