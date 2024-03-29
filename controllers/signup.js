const userModel = require('../models/user');
async function signup(req,res){
    console.log("User Signup process initiated...");
    // const email='user@email.com'
    // const password='123';
    const email = req.body.email;
    const password = req.body.password;
    var localData = req.body.localData;
    if(!localData){
        localData=null  
    }
    const data = {
        email:email,
        password:password,
        localData:localData
    }
    const alreadyExists = await userModel.findOne({email:email})
    if(alreadyExists){
        console.log("⭕🟩⭕🟩 User Already Exists!")
        res.send("Already Exists!");
    }else{
        await userModel.create(data) 
        console.log("user registered successgully")
        res.send('Done');
    }
}
module.exports=signup;