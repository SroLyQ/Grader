const { checkResult } = require("./run");
var tress = require("tress");
const axios = require("axios");
const { response } = require("express");
const fetch = require("node-fetch");

var process_queue = tress(function (body, next) {
    run_for_backend(body).then(() => next());
    console.log("processing");
}, 1);
var check_queue = tress(function(body,next){
    check_for_backend(body).then(() => next());
    console.log("checking");
},1)
module.exports = {
  add_request_to_queue,
  add_check_request_to_queue
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
async function add_check_request_to_queue(req, res) {
  check_queue.push(req.body);
  res.send({message : 'your request have been queue'});
}
async function run_for_backend({ questionId, userId, code}) {
  try{
  const dummy = await fetch(`https://api.ceboostup.com/api/grader-question/${questionId}`,{
    method : "GET",
    headers : {"Content-type": "application/json"}
  });
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
  // console.log(body)
  // axios.post('http://localhost:3400/checky',body)
  // .then((response)=>{
  //     console.log(response.data)
  // }); 
  //TODO:post result to backend
}
async function check_for_backend({ questionId, code, input, output, oldstatus}) {
  const result_after_check = await checkResult(code, input, output);
  const body = {
    questionId : questionId,
    status: result_after_check.status
  };
  console.log(body);
  if(oldstatus == 1){
    const res = await fetch('https://api.ceboostup.com/api/question-recheck', {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json" },
    });
    const b = await res.text();
    console.log(b);
  }
  else if(oldstatus == 0){
    const res = await fetch('https://api.ceboostup.com/api/question-check', {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json" },
    });
    const c = await res.text();
    console.log(c);
  }
}