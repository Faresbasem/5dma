const express=require('express');
const router=express.Router();
const user_con=require('../controller/user_con');
const veryfiy=require("../middleware/veryfiyToken");



router.route('/').get(veryfiy,user_con.getAllusers)
router.route('/register').post(user_con.register)


module.exports=router;