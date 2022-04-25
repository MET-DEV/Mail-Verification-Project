const crypto=require("crypto-js")

function hash(data){
    return crypto.HmacSHA256(data.toString(),"125124").toString()

}
module.exports=hash