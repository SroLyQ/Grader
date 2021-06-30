const express = require('express');
const cors = require('cors');
const app = express()
const {process_to_grader,add_request_to_queue} = require('./worker')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/check_result',(req,res)=>add_request_to_queue(req,res))
// app.post('/question_test',(req,res)=>checkCorrectQuestion(req,res))
app.get('/check_result',(req,res)=>{
    res.send('Hello World.This is a place for a grader to be not for you to see so get out before I call the police. ')
})
// app.post('/checky',(req,res) =>{
//     console.log(req.body);
//     res.send('ok graded');
// })
const port = 3400;
app.listen(process.env.PORT || port, ()=> console.log(`grader server started at port:${port}`))