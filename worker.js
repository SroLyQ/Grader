const { checkResult } = require("./run");
var tress = require("tress");
const axios = require("axios");
const { response } = require("express");
const fetch = require("node-fetch");

var process_queue = tress(function (body, next) {
  run_for_backend(body).then(() => next());
  console.log("processing");
}, 1);

module.exports = {
  process_to_grader,
  add_request_to_queue,
};
async function process_to_grader(req, res) {
  if (!req.body) {
    return res.json({ problem: "json_incomplete" });
  }
  console.log(req.body);
  const resultAfterCompile = await checkResult(
    req.body.code,
    req.body.input,
    req.body.output
  );
  const result_toback = {
    questionId: req.body.questionId,
    userId: req.body.userId,
    status: resultAfterCompile.status,
    result: resultAfterCompile.resultTest,
  };
  return res.send(result_toback);
}
async function add_request_to_queue(req, res) {
  process_queue.push(req.body);
  res.send({message : 'your request have been queue'});
}
async function run_for_backend({ questionId, userId, code, input, output }) {
  const result_after_run = await checkResult(code, input, output);
  const body = {
    questionId : questionId,
    userId : userId,
    result: result_after_run.resultTest,
    status: result_after_run.status,
    code: code,
    rank: 1
  };
  console.log(body);
  // //axios.post('http://localhost:3400/checky',body)
  // .then((response)=>{
  //     console.log(response.data)
  // });
    const res = await fetch("https://api.ceboostup.com/api/submit", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json" },
    });
    const a = await res.text();

    console.log(a);
}
// module.exports= async function checkCorrectQuestion(req,res){
//     if(!req.body){
//         return res.json({problem: 'json_incomplete'})
//     }
//     const resultStatus = await checkResult(req.body.code,req.body.input,req.body.output).status;
//     return res.send(resultStatus)
// }
