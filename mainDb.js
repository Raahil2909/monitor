const mongoose = require('mongoose')
// host,user_agent,accept,connection

// console.log(process.env.PORT)
const uri = process.env.URI || 'mongodb://localhost/hdr'
// console.log(`db in use ${uri}`);

mongoose.connect(uri,()=>{
    // console.log('connected to db')
})

const mainDb = new mongoose.Schema({
    dest: String,
    cookie: String,
    hdrs: String,
    src: String
})

module.exports = mongoose.model("mainDb",mainDb)