const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const mainDb = require('./mainDb')


app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    // read from the database and present all data
    console.log(JSON.parse(JSON.stringify(req.headers).replace(/-/g,'_')))
    res.render('index', {msg:JSON.stringify(req.headers,null,3).replace(/-/g,'_')})
})

app.get('/catch',async (req,res)=>{
    // capture the request and put inside the database
    const src = req.ip
    const dst = req.headers.host
    const cookie = req.headers.cookie
    const headers = JSON.stringify(req.headers,null,3).replace(/-/g,'_')
    console.log(`src = ${src}, dst = ${dst}, cookie = ${cookie}`)
    const entry = await mainDb.create({
        dest: dst,
        cookie: cookie,
        hdrs: headers,
        src: src
    })
    await entry.save()
    res.send('Thanks for coming here!!!')
})

app.get('/retrive', async (req,res)=>{
    const entry = await mainDb.find()
    console.log(typeof(entry))
    // console.log(`src = ${src}, dst = ${dest}, cookie = ${cookie}`)
    res.render('retrive',{data:entry})
})

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    // console.log(`Server listening on port ${PORT}...`)
})