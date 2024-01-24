import { Request, Response } from "express"
import { CreateCategoryDTO, CustomError, PaginationDTO } from "../../domain"
import { CategoryService } from "../services/category.services"

export class CategoryController{

    constructor(
        private readonly categoryService: CategoryService
    ){}
    
    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }

        return res.status(500).json({error:'Internal server error'})
    }

    createCategory = (req:Request,res:Response)=>{
        const [error,createCategoryDto] = CreateCategoryDTO.create(req.body)
        if(error) return res.status(400).json({error})

        this.categoryService.createCategory(createCategoryDto!,req.body.user)
        .then(category=> res.status(201).json({category}))
        .catch(err=> {
            console.log(err)
            this.handleError(err,res)})


        //res.json(createCategoryDto)

        //res.json(req.body)
    }

    getCategory = async(req:Request,res:Response)=>{

        const {page = 1, limit = 10} = req.query

        const [error, paginationDto] = PaginationDTO.create(+page,+limit)

        if(error) return res.status(400).json({error})

        this.categoryService.getCageories(paginationDto!)
        .then(categories => res.json(categories))
        .catch(err => this.handleError(err,res))
    }
}