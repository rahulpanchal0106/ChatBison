const userModel = require('../models/user');
async function signup(req,res){
    console.log("User Signup process initiated...");
    const email='user@email.com'
    const password='123';
    var localData;
    localData={
        'prompt':'heyy',
        'resp':'Hello! how can I help you today?'
    }
    const data = {
        email:email,
        password:password,
        localData:localData
    }
    const alreadyExists = await userModel.findOne({$and:[{email:email},{password:password}]})
    if(alreadyExists){
        console.log("⭕🟩⭕🟩 User Already Exists!")
        res.send("Failed");
    }else{
        await userModel.create(data) 
        console.log("user registered successgully")
        res.send('Done');
    }
}
module.exports=signup;