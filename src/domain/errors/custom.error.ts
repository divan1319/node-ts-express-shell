export class CustomError extends Error{
    
    constructor(
        public readonly statusCode:number,
        public readonly message:string
    ){
        super(message)
    }

    static badRquest(message:string){
        return new CustomError(400,message)
    }

    static unauthorize(message:string){
        return new CustomError(401,message)
    }

    static forbbiden(message:string){
        return new CustomError(403,message)
    }
    static notFound(message:string){
        return new CustomError(404,message)
    }

    static internalServer(message:string){
        return new CustomError(500,message)
    }
}