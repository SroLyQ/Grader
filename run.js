const {
    create,
    build,
    run,
    checkAnswer
} = require('./Grader.js');
module.exports = {
    checkResult
};
async function checkResult(testDummy) {
    var resultTest = '';
    var index = 0;
    //console.log(testDummy);
    // console.log(testDummy.sourceCode);
    return new Promise(async function (resolve, reject) {
        try{
        await
            create(testDummy.sourceCode, 'testTest', async function (err, filePathCpp) {
                if (err) {
                    resultTest = 'C'
                    console.log(err + " go create failed");
                    if(err.toString().includes(`is a banned library`)){
                        resultTest='L'
                    }
                    //created error
                    resolve({
                        resultTest
                    });
                    return;
                }
                console.log(filePathCpp);
                await build(filePathCpp, async function (err, filePathExe) {
                    if (err) {
                        console.log(err.message + " go build failed");
                        resultTest = 'B'
                        if(err.toString().includes('_is_a_banned_function')){
                            resultTest='F';
                        }
                        resolve({
                            resultTest
                        });
                        return;
                    }
                    //console.log(filePathExe);
                    console.log("Build Complete");
                    let runInput = testDummy.input.split('$.$');
                    let runOutput = testDummy.output.split('$.$');
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
                            if (inputMap[index].result == 'Timeout') resultTest += 'T'
                            else if(inputMap[index].result == 'Out_of_buffer') resultTest += 'O';
                            else resultTest += '-'
                        }
                        index++;
                    });
                    // console.log(resultTest);
                    resolve({
                        resultTest
                    })
                })
            })

        }
        catch(e){
            //console.log(e);
            resolve({
                'resultTest' : 'Y'
            })

        }
    })
}