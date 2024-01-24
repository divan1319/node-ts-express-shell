export class PaginationDTO{

    private constructor(
        public readonly page:number,
        public readonly limit:number,
    ){}

    static create(page:number = 1, limit:number = 10): [string?,PaginationDTO?]{
        if(isNaN(page) || isNaN(limit)) return ['page and limit deben ser numeros']

        if(page <= 0) return ['page must be greater than 0']
        if(limit <= 0) return ['limit must be greater than 0']

        return [undefined, new PaginationDTO(page,limit)]
    }
}