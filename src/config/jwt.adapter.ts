import jwt from "jsonwebtoken"
import { envs } from "./envs"

const seed = envs.JWT_SEED


export class JwtGenerator{
    //DI?

    static async generateToken(payload:any,duration:string = '2h'){
        return new Promise((resolve)=>{
            jwt.sign(payload,seed,{expiresIn: duration},(err,token)=>{
                if(err) return resolve(null)

                resolve(token)
            })
        })
    }

    static validateToken<T>(token:string): Promise<T|null>{
        return new Promise((resolve)=>{
            jwt.verify(token,seed, (err,decoded)=>{
                if(err) resolve(null)

                resolve(decoded as T)
            })
        })
    }
}