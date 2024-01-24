import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    emailVerify:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    img:{
        type:String
    },
    role:{
        type:[String],
        default:['USER'],
        enum:['ADMIN','USER','CLIENT']
    }
})

userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret,options){
        delete ret.password
        delete ret._id
    }
})

export const UserModel = mongoose.model('User',userSchema)