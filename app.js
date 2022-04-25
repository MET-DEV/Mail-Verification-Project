const express=require("express")
const config=require("./config/envconfig")
const hash=require("./hash/hash")
const User=require("./models").user

config()
const app=express()

app.use(express.json())

app.listen(process.env.PORT,()=>{
    app.use("/users",require("./routes/userRoute"))
    app.use("/verify/:hash/:id",(req,res)=>{
        console.log('req.params.id',hash(req.params.id))
        console.log('req.params.hash', req.params.hash)
        if(req.params.hash!==hash(req.params.id)) return res.status(404).send("Sayfa bulunamadı")
        
        let user={
            id:req.params.id,
            status:true
        }
        User.update(user,{where:{id:user.id}})
        res.send("Hesap Doğrulandı")
        console.log("Doğrulandı")
    })
    console.log("Port dinleniyor...")
})