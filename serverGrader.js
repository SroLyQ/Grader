const express = require('express');
const cors = require('cors');
const app = express()
const process_to_grader = require('./worker')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/check_result',(req,res)=>process_to_grader(req,res))
app.get('/',(req,res)=>{
    res.send('Hello World.This is a place for a grader to be not for you to see so get out before I call the police. ')
})
const port = 3400;
app.listen(process.env.PORT || port, ()=> console.log(`grader server started at port:${port}`))