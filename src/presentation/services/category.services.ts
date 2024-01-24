import { CategoryModel } from "../../data";
import { CreateCategoryDTO, CustomError, PaginationDTO, UserEntity } from "../../domain";

export class CategoryService {
    
    constructor(){}

    async createCategory(createCategoryDto:CreateCategoryDTO, user:UserEntity){
        const categoryExist = await CategoryModel.findOne({name:createCategoryDto.name})

        if(categoryExist) throw CustomError.badRquest('Category already exist')

        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user:user.id
            })

            category.save()

            return{
                id:category.id,
                name:category.name,
                available:category.available
            }
        } catch (error) {
            throw CustomError.internalServer('error server')
        }
    }

    async getCageories(paginationDto:PaginationDTO){

        const {page,limit} = paginationDto
        try {
            
            //const categories = await CategoryModel.find()
            //.skip((page-1)*limit)
            //.limit(limit)

            const [total,categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page-1)*limit)
                    .limit(limit)
            ])
            return {
                page,
                limit,
                total,
                categories:categories.map(category => ({
                    id:category.id,
                    name:category.name,
                    available:category.available,
                }))
            }
        } catch (error) {
            throw CustomError.internalServer('server error')
        }
    }
}