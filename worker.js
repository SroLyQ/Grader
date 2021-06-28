const { checkResult } = require("./run");

module.exports=async function process_to_grader(req,res){
    if(!req.body){
        return res.json({problem: 'json_incomplete'})
    }
    console.log(req.body)
    const resultAfterCompile =await checkResult(req.body.code,req.body.input,req.body.output);
    const result_toback = {
        questionId : req.body.questionId,
        userId : req.body.userId,
        status : resultAfterCompile.status,
        result : resultAfterCompile.resultTest
    }
    return res.send(result_toback);
}