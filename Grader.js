const { execFile, exec } = require('child_process');
var fs = require('fs');

module.exports = {
    create,
    build,
    run,
    checkAnswer,

};
const checkForBannedLib = require('./checkBanLib')
async function create(sourceCode, fileName, callback) {
    let checkedSource = checkForBannedLib(sourceCode); 
    if(checkedSource[0]==-1){callback(checkedSource[1],null)}
    fs.writeFile(`./testCode/${fileName}.cpp`, `${checkedSource[1]}`, function (err) {
        if (err) {
            console.log(err.message + ' create failed');
            callback(err, null)
            return 0;
        }
        callback(null, `./testCode/${fileName}.cpp`)
    });
}
async function build(filePathCpp, callback) {
    let exeName = filePathCpp.split('/')[2].split('.')[0];
    await exec(`g++ -w -std=c++14 ${filePathCpp} -o ./testExe/${exeName}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err.message + " build failed");
            callback(err, null);
        }
        else if (stderr) {
            console.log(stderr.message + " Code pid");
            callback(err, null);
        }
        callback(err, `./testExe/${exeName}`);
    });
}
async function run(filePathExe, input) {
    return new Promise(async function (resolve, reject) {
        try {
            var child = await execFile(filePathExe, { timeout: 1000,maxBuffer:65536 }, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    if (err.signal == 'SIGTERM') {
                        result = 'Timeout';
                        resolve({
                            result
                        });
                    }
                }
                else if (stderr) {
                    console.log(stderr);
                    result = 'failed';
                    resolve({
                        result
                    });
                }
                else {
                    result = stdout;
                    //console.log(result);
                    resolve({
                        result
                    });

                }
            });
            child.stdin.setEncoding('utf-8');
            child.stdin.write(input);
            child.stdin.end();
        }
        catch (e) {
            console.log(e);
        }
    })
}
function checkAnswer(sourceOutput, testCaseOutput) {

    var trimedSourceOutput = sourceOutput.trimEnd().split(/\r?\n/);
    var trimedTestCaseOutput = testCaseOutput.trimEnd().split(/\r?\n/);
    //cut back cut front
    //console.log(trimedSourceOutput + ' == ' + trimedTestCaseOutput)
    //console.log(trimedTestCaseOutput == trimedSourceOutput)
    for (var index = 0; index < trimedSourceOutput.length; index++) {
        // console.log(trimedSourceOutput[index].trimEnd())
        //  console.log('--------------------')
        // console.log(trimedTestCaseOutput[index].trimEnd())
        // console.log('====================')
        //console.log(trimedTestCaseOutput[index].trimEnd())
        if (trimedSourceOutput[index].trimEnd() != trimedTestCaseOutput[index].trimEnd()) {
            return false;
        }

    }
    return true;

}