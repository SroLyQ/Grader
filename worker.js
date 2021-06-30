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
  //process_to_grader,
  add_request_to_queue,
  add_check_request_to_queue
};
// async function process_to_grader(req, res) {
//   if (!req.body) {
//     return res.json({ problem: "json_incomplete" });
//   }
//   console.log(req.body);
//   const resultAfterCompile = await checkResult(
//     req.body.code,
//     req.body.input,
//     req.body.output
//   );
//   const result_toback = {
//     questionId: req.body.questionId,
//     userId: req.body.userId,
//     status: resultAfterCompile.status,
//     result: resultAfterCompile.resultTest,
//   };
//   return res.send(result_toback);
// }
async function add_request_to_queue(req, res) {
  process_queue.push(req.body);
  res.send({message : 'your request have been queue'});
}
async function add_check_request_to_queue(req, res) {
  check_queue.push(req.body);
  res.send({message : 'your request have been queue'});
}
async function run_for_backend({ questionId, userId, code, input, output, rank, number }) {
 
  const result_after_run = await checkResult(code, input, output);
  const body = {
    questionId : questionId,
    userId : userId,
    result: result_after_run.resultTest,
    status: result_after_run.status,
    code: code,
    rank: rank,
    number : number
  };
  console.log(body)
  axios.post('http://localhost:3400/checky',body)
  .then((response)=>{
      console.log(response.data)
  }); 
  //TODO:post result to backend
  // const res = await fetch('https://api.ceboostup.com/api/submit', {
  //   method: "POST",
  //   body: JSON.stringify(body),
  //   headers: { "Content-type": "application/json" },
  // });
  //const a = await res.json();
  //console.log(a);
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