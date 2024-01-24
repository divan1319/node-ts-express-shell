import mongoose from "mongoose"

interface OptionsI{
    mongoUrl:string
    dbName:string
}

export class MongoDatabase{
    static async connect(options:OptionsI){
        const {mongoUrl,dbName} = options

        try {
            await mongoose.connect(mongoUrl,{
                dbName:dbName
            })
            
            console.log('connected')
            return true
        } catch (error) {
            console.log('mongo error connecto', error)
            throw Error
        }
    }

    static async disconnect(){
        await mongoose.disconnect()
    }
}