import { regularExps } from "../../../config"

export class RegisterUserDTO{

    private constructor(
        public name:string,
        public email:string,
        public password:string,
    ){}

    static create(obj:{[key:string]:any}): [string?,RegisterUserDTO?]{
        const {name, email,password} = obj

        if(!name) return ['missing name'];
        if(!name) return ['missing email'];
        if(!regularExps.email.test(email)) return ['Email is not valid']
        if(!password) return ['missing password']
        if(password.length < 6) return ['pass to short']

        return [undefined,new RegisterUserDTO(name,email,password)]
    }
}