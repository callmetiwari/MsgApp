const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:String,
        required:true
    }
});

const chat = mongoose.model("Chat",chatSchema);

module.exports=chat;