import { Validators } from "../../../config"

export class CreateProductDTO{

    private constructor(
        public readonly name:string,
        public readonly available:boolean,
        public readonly price:number,
        public readonly description:string,
        public readonly user:string, //id
        public readonly category:string,//id
    ){}

    static create(obj:{[key:string]:any}):[string?,CreateProductDTO?]{

        const {name,available,price,description,user,category} = obj

        if(!name) return ['missing name']
        
        if(!user) return ['missing user']
        if(!Validators.isMongoId(user)) return ['Invalid user ID']
        
        if(!category) return ['missing category']
        if(!Validators.isMongoId(category)) return ['Invalid category ID']

        return [undefined,new CreateProductDTO(name,!!available,price,description,user,category)]

    }
}