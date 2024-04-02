const asyncfn=require("../middleware/asyncwrapper");
const User=require('../models/usrer_mod');
const httpstatus=require("../utils/httpstatus");
const apperror=require("../utils/app_error");
const bcrybt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const genratejwt=require('../utils/genrate_jwt');


const getAllusers=asyncfn(async(req,res)=>{
    // get all user from DB using model
    const query=req.query;
    const limit=query.limit||4;
    const page=query.page||1;
    const skip=(page - 1) * limit;
//hide password
    const users= await User.find({},{"__v":false,"password":false}).limit(limit).skip(skip);
    res.json({status:httpstatus.suc,data:{users}});
    });
const register=asyncfn(async(req,res,next)=>{
    console.log(req.body);

    const {email,password}=req.body;
    const olduser=await User.findOne({email:email});
    if(olduser){
        const error= apperror.create("user already founded",404,httpstatus.Fail)
        return next(error)
    }

    // hash pass
    // const hashpass=await bcrybt.hash(password,10);
    const newUser=new User({
        email,
        password
      
    })

    //genrate jwt token

    const token= await genratejwt({email:newUser.email,id:newUser._id});
    console.log("token",token);
    newUser.token=token;
    await newUser.save();
    res.status(201).json({status:httpstatus.suc,data:newUser})



})


module.exports={
    getAllusers,
    register,

}