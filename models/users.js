const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:String,required:true},

})

const UserModel=mongoose.model("UserModel",userSchema)

module.exports=UserModel