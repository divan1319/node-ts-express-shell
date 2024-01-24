import { JwtGenerator, PasswordCrypt, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";
import { EmailService } from "./email.services";

export class AuthService {
    constructor(
        private readonly emailService: EmailService
    ) { }

    public async registerUser(registerUserDto: RegisterUserDTO) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email })

        if (existUser) throw CustomError.badRquest('email already exist')

        try {
            const user = new UserModel(registerUserDto)

            ///encriptar contraseña
            user.password = PasswordCrypt.hash(registerUserDto.password)

            await user.save()

            //Email de confirmacion

            await this.sendEmailValidationLink(user.email)

            const { password, ...userInfo } = UserEntity.fromObject(user)
            const token = await JwtGenerator.generateToken({ id: user.id })


            return {
                user: { ...userInfo },
                token
            }

        } catch (error) {
            throw CustomError.internalServer(`Hubo un error al registrar el usuario ${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDTO) {
        const existUser = await UserModel.findOne({ email: loginUserDto.email })

        if (!existUser) throw CustomError.badRquest('user not found')

        try {
            if (!PasswordCrypt.compare(loginUserDto.password, existUser.password)) throw CustomError.forbbiden("Revisa bien tus credenciales")

            const { password, ...userEntity } = UserEntity.fromObject(existUser)

            const token = await JwtGenerator.generateToken({ id: existUser.id })
            if (!token) throw CustomError.internalServer('Error while generating the JWT')

            return {
                user: userEntity,
                token: token
            }
        } catch (error) {
            throw CustomError.internalServer(`Hubo un error al autenticarse, ${error}`)
        }
    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtGenerator.generateToken({email})

        if(!token) throw CustomError.internalServer('error getting token')

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
        const html = `
            <h1>Validating Account</h1>
            <p>Click on the link to verify your account</p>
            <a href="${link}">Verify my account</a>
        `

        const options = {
            to:email,
            subject:'Validate your account',
            htmlBody:html
        }

        const isSent = await this.emailService.sendEmail(options)

        if(!isSent) throw CustomError.internalServer('Error sending email')

        return true
    }

    public validateEmail = async (token:string)=>{

        const payload = await JwtGenerator.validateToken(token)
        if(!payload) throw CustomError.unauthorize('invalid token')

        
        const {email} = payload as {email:string}
        if(!email) throw CustomError.internalServer('Email not in token')

        
        const user = await UserModel.findOne({email})
        if(!user) throw CustomError.internalServer('Email not found')


        user.emailVerify = true
        await user.save()

        return true
    }
}