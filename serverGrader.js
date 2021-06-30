const express = require('express');
const cors = require('cors');
const app = express()
const {
    //process_to_grader,
    add_request_to_queue,
    add_check_request_to_queue} = require('./worker')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/check_result',(req,res)=>add_request_to_queue(req,res)) //TODO: Get request from frontend
app.get('/check_result',(req,res)=>{
    res.send('Hello World.This is a place for a grader to be not for you to see so get out before I call the police. ')
})
app.post('/checky',(req,res) =>{
    console.log(req.body);
    res.send('ok graded');
})
app.post('/check_correct',(req,res)=>add_check_request_to_queue(req,res))
const port = 3400;
app.listen(process.env.PORT || port, ()=> console.log(`grader server started at port:${port}`))