const mongoose = require('mongoose');

const convoSchema = mongoose.Schema({
    prompt:{
        type:String
    },
    resp:{
        type:String
    },
    userInfo:{
        type:Object
    },
    tokens:{
        type:Number
    }
},{
    timestamps:true
})

const convoModel = mongoose.model("test1",convoSchema);

module.exports=convoModel;