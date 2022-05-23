import express,{Router, Express, Request, Response} from 'express'
import {UserLoginController} from '../controllers/usersController'
import {TestGetAllUsers} from '../controllers/TestController'
import {AdminController} from '../controllers/adminController'
import {ProductController, ProductActionController} from '../controllers/productsController'
import {isAuth} from '../config/jwt'

abstract class InitRoutes {
  public router:Router;
  public app:Express;

  constructor(app:Express){
    this.app = app;
    this.router = express.Router();
  }
  initRoutes():void{
    this.app.use('/',this.router);
  }
  abstract requestPage():void;
}

class HomeRouter extends InitRoutes{
  
  constructor(app:Express){ 
    super(app);
  }
  
  requestPage():void{
    this.router.get('/', (req: Request, res: Response)=>{
      res.send("hello home page")
    })
    this.initRoutes();
  }

}

class UserRouter extends InitRoutes{
  constructor(app:Express){
    super(app)
  }
  requestPage():void{
    this.router.post('/api/users/register',(req:Request, res:Response)=>{
      UserLoginController.getInstance().registerController(req, res)
    })
    this.router.post('/api/users/signin',(req:Request, res:Response)=>{
      UserLoginController.getInstance().signInController(req, res)
    })
    this.initRoutes()
  }
}

class AdminRouter extends InitRoutes{
  constructor(app:Express){
    super(app)
  }
  requestPage():void{
    this.router.get('/api/users/getAllUsers',isAuth,(req:Request, res:Response)=>{
      AdminController.getInstance().getAllUser(req, res)
    })

    this.initRoutes()
  }
}

class ProductRouter extends InitRoutes{
  constructor(app:Express){
    super(app)
  }
  requestPage():void{
    this.router.get('/api/products',(req:Request, res:Response)=>{
      ProductController.getInstance().getProducts(req, res)
    })
    this.router.get('/api/categories',(req:Request, res:Response)=>{
      ProductController.getInstance().getCategories(req, res)
    })
    this.router.post('/api/product/create',(req:Request, res:Response)=>{
      ProductActionController.getInstance().createProduct(req, res)
    })
    this.router.put('/api/product/update/:id',(req:Request, res:Response)=>{
      ProductActionController.getInstance().updateProduct(req, res)
    })
    
    this.initRoutes()
  }
}

class TestRouter extends InitRoutes{
  constructor(app: Express){
    super(app)
  }
  requestPage():void{
    this.router.get('/test/getAllUsers',(req:Request, res:Response)=>{
      TestGetAllUsers.getInstance().test(req, res)
    })
    this.router.get('/test/getAllProduct',(req:Request, res:Response)=>{
      TestGetAllUsers.getInstance().testProduct(req, res)
    })
    
    this.initRoutes()
  }
}

export default class RoutesFacade{
  private app:Express;
  
  constructor(app:Express){
    this.app = app;
  }
  runRoutes():void{
    const homeRouter:InitRoutes = new HomeRouter(this.app)
    homeRouter.requestPage()
    const user:InitRoutes = new UserRouter(this.app)
    user.requestPage()
    const adminRouter: InitRoutes = new AdminRouter(this.app)
    adminRouter.requestPage()
    const productRouter: InitRoutes = new ProductRouter(this.app)
    productRouter.requestPage()   
    const testRouter:InitRoutes = new TestRouter(this.app)
    testRouter.requestPage()

  }
}