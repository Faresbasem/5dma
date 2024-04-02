const mongoose=require('mongoose');
const validator=require('validator');
const userschema=new mongoose.Schema({
            email:{
                    type:String,
                    requierd:true,
                    unique:true,
                    validate:[validator.isEmail,'email must be  a valid Email Address'],  // array
                },
            password:{
                type:String,
                requierd:true
            },
            token:{
                type:String
            }
})
module.exports=mongoose.model("user",userschema)