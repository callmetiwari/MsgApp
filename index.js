const express=require("express")
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded ({extended: true}));
app.use(methodOverride("_method"));

main().then(()=>{console.log("on mongo")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



app.listen(8080,()=>{
  //console.log("ok listen");
})

//index route

app.get("/chats", async(req,res) =>{
    let chats=await chat.find();
    res.render( "index.ejs" ,{chats});
})

//new chat
app.get("/new", (req,res) =>{
  //console.log("new");
  res.render("new.ejs");
})


//new chat creation

app.post("/chats",async (req,res)=>{
    
  let {from,msg,to}=req.body;
  let newChat=new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()

  })
  newChat.save();
  res.redirect("/chats");
  
});
 
//update

app.get("/chats/:id/edit",async (req,res)=>{
     let {id}=req.params;
     let chats=await chat.findById(id);
     res.render("edit.ejs",{chats});
})

//updated
app.put("/chats/:id",async (req,res)=>{
  let { id }     =req.params;
  let {msg: newMsg } =req.body;
  //console.log(newMsg);
  let updatedChat=await chat.findByIdAndUpdate(
    id,
    { msg : newMsg },
    {runValidators:true,new:true}
  );
 // console.log(updatedChat); 
  res.redirect("/chats");
  
})

//Delete

app.delete("/chats/:id" ,async(req,res)=>{
     let {id}=req.params;
     let chat1=await chat.findByIdAndDelete(id);
     res.redirect("/chats");

})

// app.get("/chats/:id" ,async(req,res)=>{
//   let {id}=req.params;
//   let chat1=await chat.findByIdAndDelete(id);
//   res.redirect("/chats");

// })


app.get("/",(req,res)=>{
   res.send("ok");
}) 