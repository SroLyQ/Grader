const {
    create,
    build,
    run,
    checkAnswer
} = require('./Grader.js');
module.exports = {
    checkResult
};
async function checkResult(sourceCode,input,output) {
    var resultTest = '';
    var index = 0;
    var status = 2;
    //console.log(testDummy);
    // console.log(testDummy.sourceCode);
    return new Promise(async function (resolve, reject) {
        try{
        await
            create(sourceCode, 'testTest', async function (err, filePathCpp) {
                if (err) {
                    resultTest = 'C'
                    status = 1;
                    console.log(err + " go create failed");
                    if(err.toString().includes(`is a banned library`)){
                        resultTest='L'
                    }
                    //created error
                    resolve({
                        resultTest,
                        status
                    });
                    return;
                }
                //console.log(filePathCpp);
                await build(filePathCpp, async function (err, filePathExe) {
                    if (err) {
                        //console.log(err.message + " go build failed");
                        resultTest = 'B'
                        status = 1;
                        if(err.toString().includes('_is_a_banned_function')){
                            resultTest='F';
                        }
                        resolve({
                            resultTest,
                            status
                        });
                        return;
                    }
                    //console.log(filePathExe);
                    console.log("Build Complete");
                    if(input == null){
                        input='$.$';
                    }
                    let runInput = input.split('$.$');
                    let runOutput = output.split('$.$');
                    var inputMap = [];
                    //console.log(runInput);
                    //console.log(runOutput);
                    const mapInput = runInput.map(async (inputX, idx) => {
                        inputMap[idx] = await run(filePathExe, inputX);
                        //console.log(inputX)
                        //console.log(result_[idx].result);
                    });
                    await Promise.all(mapInput);
                    runOutput.forEach(runTest => {
                        if (checkAnswer(inputMap[index].result, runTest)) {
                            resultTest += 'P'
                        } else {
                            if (inputMap[index].result == 'Timeout') resultTest += 'T',status=1
                            else if(inputMap[index].result == 'Out_of_buffer') resultTest += 'O',status = 1;
                            else if(inputMap[index].result == 'runtime_error') resultTest += 'X', status= 1;
                            else resultTest += '-',status = 1
                        }
                        index++;
                    });
                    // console.log(resultTest);
                    resolve({
                        resultTest,
                        status
                    })
                })
            })

        }
        catch(e){
            //console.log(e);
            resolve({
                'resultTest' : 'Y',
                'status' : 0 
            })

        }
    })
}