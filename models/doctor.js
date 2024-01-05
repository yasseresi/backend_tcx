import mongoose from 'mongoose';

const Schema = mongoose.Schema(
    {
        _id : String,
        name:{
            type : String,
            required : true
        },
        email:{
            type : String,
            required : true
        },
        password:{
            type : String,
            required : true
        },
        specialty : String,
        description : String,
    }
)

export const doctorModel = mongoose.model('doc1', Schema,"doctor");



