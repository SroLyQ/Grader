const express = require('express');
const cors = require('cors');
const app = express()
const process_to_grader = require('./worker')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/check_result',(req,res)=>{
    process_to_grader(req,res)
})

const port = 3400;
app.listen(process.env.PORT || port, ()=> console.log(`grader server started at port:${port}`))