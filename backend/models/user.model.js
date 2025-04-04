 import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLenght:6,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[],
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[],
    }],
    profileImg:{
        type:String,
        default:"",
    },
    coverImg:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
    },
    link:{
        type:String,
        default:"",
    },
    likedPosts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        default:[],
    }],
 },{timestamps:true});

const User = mongoose.model("User",userSchema); // Create a model from the schema
export default User; // Export the model