const mongoose=require("mongoose");
const chat=require("./models/chat.js");


main().then(()=>{console.log("on mongo")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

chat.insertMany([{
    from:"s",
    to:"shas",
    msg:"bring file tomorrow",
    created_at:new Date()
  
  },{
    from:"pooja",
    to:"shas",
    msg:"open lock",
    created_at:new Date()
  
  },{
    from:"priya",
    to:"shas",
    msg:"bring lunch",
    created_at:new Date()
  
  }
]);