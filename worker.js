const { checkResult } = require("./run");
var tress = require("tress");
const axios = require("axios");
const { response } = require("express");
const fetch = require("node-fetch");

var process_queue = tress(function (body, next) {
    try{
      run_for_backend(body).then(() => next());
      console.log("processing");
    }
    catch(e){
      console.log(e.message);
    }
}, 1);
module.exports = {
  add_request_to_queue,test
};
async function add_request_to_queue(req, res) {
  try{
    process_queue.push(req.body);
    res.send({message : 'your request have been queue'});
  }
  catch(e){
    res.send({problem : 'error sending request'});
  }
}
async function test(req,res){
    let a = await checkResult(req.code);
    res.send(a);
}
async function run_for_backend({ questionId, userId, code}) {
  try{
  const dummy = await fetch(`https://api.ceboostup.com/api/grader-question/${questionId}`,{
    method : "GET",
    headers : {"Content-type": "application/json"}
  });
  const CONFIRM = process.env.CONFIRM
  const dummyIO = await dummy.json();
  const result_after_run = await checkResult(code, dummyIO.input, dummyIO.output);
  const body = {
    questionId : questionId,
    userId : userId,
    result: result_after_run.resultTest,
    status: result_after_run.status,
    code: code,
    number : dummyIO.number,
    rank : dummyIO.rank,
    confirm: CONFIRM
  }
  console.log(body.result);
  const res = await fetch('https://api.ceboostup.com/api/submit', {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json" },
  });
  const a = await res.json();
  console.log(a);
  }
  catch(e){
    console.log(e.message);
  }
  //TODO:post result to backend
}