import { CategoryModel, ProductModel } from "../../data";
import { CreateProductDTO, CustomError, PaginationDTO } from "../../domain";

export class ProductService {
    
    constructor(){}

    async createProduct(createProductDto:CreateProductDTO){
        const productExist = await ProductModel.findOne({name:createProductDto.name})

        if(productExist) throw CustomError.badRquest('product already exist')

        try {
            const product = new ProductModel({
                ...createProductDto
            })

            product.save()

            return product

        } catch (error) {
            throw CustomError.internalServer('error server')
        }
    }

    async getProducts(paginationDto:PaginationDTO){

        const {page,limit} = paginationDto
        try {
            
            //const categories = await CategoryModel.find()
            //.skip((page-1)*limit)
            //.limit(limit)

            const [total,products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page-1)*limit)
                    .limit(limit)
                    .populate('user')
            ])
            return {
                page,
                limit,
                total,
                products
            }
        } catch (error) {
            throw CustomError.internalServer('server error')
        }
    }
}