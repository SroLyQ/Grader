const { execFile, exec } = require('child_process');
var fs = require('fs');

module.exports = {
    create,
    build,
    run,
    checkAnswer
};
async function create(sourceCode, fileName, callback) {
    fs.writeFile(`./testCode/${fileName}.cpp`, `${sourceCode}`, function (err) {
        if (err) {
            console.log(err.message + ' create failed');
            callback(err, null)
            return 0;
        }
        callback(err, `./testCode/${fileName}.cpp`)
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
            var child = await execFile(filePathExe, { timeout: 1000 }, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    result = 'failed';
                    resolve({
                        result
                    });

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
    //console.log(trimedSourceOutput + ' == ' + trimedSourceOutput)
    //console.log(trimedSourceOutput == trimedTestCaseOutput)
    for(var index = 0 ; index < trimedSourceOutput.length ; index++){
           // console.log(trimedSourceOutput[index])
           // console.log(trimedTestCaseOutput[index])
        if (trimedSourceOutput[index] != trimedTestCaseOutput[index]) {
            return false;
        }

    }
    return true;

}
// async function go() {
//     await
//         create('testFirst', async function (err, filePathCpp) {
//             if (err) {
//                 console.log(err.message + " go create failed");
//                 return;
//             }
//             console.log("Create Complete")
//             console.log(filePathCpp);
//             await build(filePathCpp, async function (err, filePathExe) {
//                 if (err) {
//                     console.log(err.message + " go build failed");
//                     return;
//                 }
//                 console.log(filePathExe);
//                 console.log("Build Complete");
//                 var ans = await run(filePathExe);
//                 console.log(ans);
//             })
//         })
// }
// (async () => {
//     await go();
// })();