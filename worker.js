const { checkResult } = require("./run");

module.exports=async function process_to_grader(req,res){
    if(!req.body){
        return res.json({problem: 'json_incomplete'})
    }
    const result_toback =await checkResult(req.body);
    return res.send(result_toback);
}