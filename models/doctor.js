import mongoose from 'mongoose';

const Schema = mongoose.Schema(
    {
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
    }
)

export const doctorModel = mongoose.model('doc1', Schema,"doctor");



