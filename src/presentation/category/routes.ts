import {Router} from "express"
import { CategoryController } from "./controller"
import { AuthMiddleware } from "../middlewares/auth.middleware"
import { CategoryService } from "../services/category.services"


export class CategoryRoutes{


    static get routes():Router{
        const router = Router()
        const categoryService = new CategoryService()
        const controller = new CategoryController(categoryService)
        router.get('/',controller.getCategory)
        router.post('/',[AuthMiddleware.validateJWT],controller.createCategory)

        return router
    }
}