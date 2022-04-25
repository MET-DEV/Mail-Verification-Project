const nodemailer=require("nodemailer")
const hash=require("../hash/hash")


const sendMail=async(email,id)=>{
    let hashToId=hash(id)
    try{
        const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL_ADDRESS,
            pass:process.env.EMAIL_PASSWORD,
        }
    })
    await transporter.sendMail({
        from:process.env,
        to:email,
        subject:"Mail Doğrulaması",
        html:`<p>Lütfen mailinizi doğrulamak için buraya <a href=http://localhost:3000/verify/${hashToId}/${id}>Tıklayınız</a></p>`
    })
    }catch(error){
        console.log(error)
    }
}
module.exports=sendMail