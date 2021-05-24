const {
    create,
    build,
    run,
    checkAnswer
} = require('./Grader.js');
module.exports = {
    go
};
async function go(testDummy) {
    var resultTest = '';
    var index = 0;
    //console.log(testDummy);
    // console.log(testDummy.sourceCode);
    return new Promise(async function (resolve, reject) {
        await
            create(testDummy.sourceCode, 'testTest', async function (err, filePathCpp) {
                if (err) {
                    console.log(err.message + " go create failed");
                    //created error
                    resultTest = 'E'
                    resolve({
                        resultTest
                    });
                }
                console.log("Create Complete")
                console.log(filePathCpp);
                await build(filePathCpp, async function (err, filePathExe) {
                    if (err) {
                        console.log(err.message + " go build failed");
                        resultTest = 'B'
                        resolve({
                            resultTest
                        });
                    }
                    //console.log(filePathExe);
                    console.log("Build Complete");
                    let runInput = testDummy.input.split('$.$');
                    let runOutput = testDummy.output.split('$.$');
                    var result_ = [];
                    console.log(runInput);
                    console.log(runOutput);
                    const processXing = runInput.map(async (inputX, idx) => {
                        result_[idx] = await run(filePathExe, inputX);
                        //console.log(inputX)
                        //console.log(result_[idx].result);
                    });
                    await Promise.all(processXing);
                    runOutput.forEach(runTest => {
                        if (checkAnswer(result_[index].result, runTest)) {
                            resultTest += 'P'
                        } else {
                            resultTest += '-'
                        }
                        index++;
                    });
                    //console.log(resultTest);
                    resolve({
                        resultTest
                    })
                })
            })


        return;

    })
}