const express=require("express")
const route=express.Router()
const User=require("../models").user
const hash=require("../hash/hash")
const sendMail=require("../mail/generateMail")

route.get("/",(req,res)=>{
    User.findAll().then(users=>res.send(users)).catch(e=>console.log(e))
})

route.post("/",(req,res)=>{
    req.body.status=false
    req.body.password=hash(req.body.password)
    User.create(req.body).then(user=>{
         res.send(user)
        sendMail(user.email,user.id)
        
        }).catch(e=>console.log(e))
})
route.post("/update",(req,res)=>{
    User.update(req.body,{where:{id:req.body.id}}).then(user=>res.send(user)).catch(e=>console.log(e))
})

module.exports=route