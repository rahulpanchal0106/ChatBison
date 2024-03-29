const userModel=require('../models/user');
async function postUserLogin(req,res,next){
    // const email='user@email.com';
    // const password='123';

    // const email = req.body.email;
    // const password = req.body.password;
    const { email, password } = req.query;
    console.log("🔥🔥 Query params: ",email,password)
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
        return res.status(401).send("Wrong password");
    }else{
        console.log("⭕⭕⭕ Cannot find user");
        return res.status(404).send("Not found");
    }
    
}
module.exports=postUserLogin;