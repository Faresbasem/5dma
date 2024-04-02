
require('dotenv').config()
const express=require("express");
const app=express();
const cors=require('cors');
const httpser=require("./utils/httpstatus")
const mongoose=require('mongoose');
const url=process.env.mongo_url;

mongoose.connect(url).then(()=>{
    console.log("data base okkk");
})
app.use(cors())
app.use(express.json())
const user_router=require('./routes/user_routes');
app.use('/api/user',user_router);
app.all("*",(req,res)=>{
    return res.status(404).json({status:httpser.ERR,data:null,Message:"this resourse not avalible",code:404});
})
//global error handler
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status:error.statusText||httpser.ERR,message:error.message,code:error.statusCode||500,data:null });
})
app.listen(process.env.port||4000,()=>{
    console.log("ser is ok");
     
    })