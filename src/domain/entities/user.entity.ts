import { CustomError } from "../errors/custom.error"

export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailVerify: boolean,
        public password: string,
        public role: [string],
        public img?: string,

    ) {
    }

    static fromObject(obj: { [key: string]: any }) {
        const { id, _id, name, email, emailVerify, password, role, img } = obj

        if (!_id && !id) {
            throw CustomError.badRquest('missing id')
        }

        if (!name) throw CustomError.badRquest('missing name')
        if (!email) throw CustomError.badRquest('missing email')
        if (emailVerify === undefined) throw CustomError.badRquest('missing verification')
        if (!password) throw CustomError.badRquest('Missing password')
        if (!role) throw CustomError.badRquest('missing roles')

        return new UserEntity(_id || id, name, email, emailVerify, password, role, img)
    }
}