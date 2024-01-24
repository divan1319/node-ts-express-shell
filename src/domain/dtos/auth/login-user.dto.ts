import { PasswordCrypt } from "../../../config"

export class LoginUserDTO{

    private constructor(
        public email:string,
        public password:string
    ){}

    static login (obj : {[key:string]:any}): [string?,LoginUserDTO?]{

        const {email,password} = obj
        if(!email) return ['missing email']
        if(!password) return ['missing password']

        return [undefined,new LoginUserDTO(email,password)]
    }
}