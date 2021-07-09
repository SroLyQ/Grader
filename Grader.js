const { execFile, exec } = require("child_process");
var fs = require("fs");
const { stdout } = require("process");
const checkForBannedLib = require("./checkBanLib");

module.exports = {
  create,
  build,
  run,
  checkAnswer,
};
async function create(sourceCode, fileName, callback) {
  let checkedSource = checkForBannedLib(sourceCode);
  if (checkedSource[0] == -1) {
    callback(checkedSource[1], null);
  }
  fs.writeFile(
    `./testCode/${fileName}.cpp`,
    `${checkedSource[1]}`,
    function (err) {
      if (err) {
        console.log(err.message + " create failed");
        callback(err, null);
        return 0;
      }
      callback(null, `./testCode/${fileName}.cpp`);
    }
  );
}
async function build(filePathCpp, callback) {
  let exeName = filePathCpp.split("/")[2].split(".")[0];
  await exec(
    `g++ -w -std=c++14 ${filePathCpp} -o ./testExe/${exeName}`,
    (err, stdout, stderr) => {
      if (err) {
        //console.log(err.message + " build failed");
        callback(err, null);
      } else if (stderr) {
        console.log(stderr.message + " Code pid");
        callback(err, null);
      }
      callback(err, `./testExe/${exeName}`);
    }
  );
}
async function run(filePathExe, input) {
  return new Promise(async function (resolve, reject) {
    try {
      var child = await execFile(
        filePathExe,
        { timeout: 1000, maxBuffer: 1024 * 1024 },
        (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            if (err.signal && err.signal == "SIGTERM") {
              result = "Timeout";
              resolve({
                result,
              });
            } else if (
              err.code &&
              err.code == "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"
            ) {
              result = "Out_of_buffer";
              resolve({
                result,
              });
            } else {
              result = "runtime_error";
              resolve({
                result,
              });
            }
          } else if (stderr) {
            console.log(stderr);
            result = "failed";
            resolve({
              result,
            });
          } else {
            console.log(stdout);
            result = stdout;
            resolve({
              result,
            });
            return;
          }
        }
      );
      console.log(input);
      child.stdin.pipe(child.stdin);
      child.stdin.setEncoding("utf-8");
      child.stdin.write(input);
      child.stdin.end();
      //!if you dont have error handler your grader will go boom
      child.stdin.on('error',(code)=>{
          console.log(`child process exited with code ${code}`)
          result = 'noneedforinput';
          resolve({
            result,
          })
       })
    } catch (e) {
      console.log(e);
    }
  });
}
function checkAnswer(sourceOutput, testCaseOutput) {
  var trimedSourceOutput = sourceOutput.trimEnd().split(/\r?\n/);
  var trimedTestCaseOutput = testCaseOutput.trimEnd().split(/\r?\n/);
  for (var index = 0; index < trimedSourceOutput.length; index++) {
    if (
      trimedSourceOutput[index].trimEnd() !=
      trimedTestCaseOutput[index].trimEnd()
    ) {
      return false;
    }
  }
  return true;
}
