const userModel=require('../models/user');
async function postUserLogin(req,res,next){
    const email='user@email.com';
    const password='13';

    console.log("verifying user...");
    const verifyEmail = await userModel.findOne({email:email})
    const verifyBoth=await userModel.findOne({$and:[{email:email} , {password:password}]});
    
    if(verifyEmail && verifyBoth){
        console.log(verifyBoth);
        console.log("🟩🟩🟩 verified!");
        req.isAuthenticated = true; 
        return next();
    }else if(verifyEmail && !verifyBoth){
        console.log(verifyEmail)
        console.log("🔴🔴🔴🔴🔴🔴 Incorrect Password");
        return res.status(401);
    }else{
        console.log("⭕⭕⭕ Cannot find user");
        return res.status(404);
    }
    
}
module.exports=postUserLogin;