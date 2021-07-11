const cluster = require('cluster')
var coreTotal = require('os').cpus().length-4
const express = require('express');
const cors = require('cors');
const {
    //process_to_grader,
    add_request_to_queue,
    add_check_request_to_queue} = require('./worker')

if(cluster.isMaster){
  
    // Fork workers.
    for (let i = 0; i < coreTotal; i++) {
      cluster.fork();
    }
    // This event is firs when worker died
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
}
else{
const app = express()
app.use(cors())
app.use(express.json({limit : '1mb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.urlencoded({limit : '1mb',extended : false}));
app.post('/check_result',(req,res)=>add_request_to_queue(req,res)) //TODO: Get request from frontend
app.get('/check_result',(req,res)=>{
    res.send('Hello World.This is a place for a grader to be not for you to see so get out before I call the police. ')
})
app.post('/check_correct',(req,res)=>add_check_request_to_queue(req,res))
const port = 3400;
app.listen(process.env.PORT || port, ()=> console.log(`grader server started at port:${port}, worker number ${process.pid}`))}