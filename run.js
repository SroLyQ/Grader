const {
    create,
    build,
    run
} = require('./Grader.js');
var code = `#include <stdio.h> 
            int main(){
                char a;
                scanf(" %c",&a);
                printf("%c",a);
                return 0;
            }
    `
var testDummy = {
    input: `a$.$b$.$c`,
    output: `a$.$b$.$c`,
    sourceCode: code
}
async function go() {
    var resultTest = '';
    var index = 0;
    await
        create(code, 'testTest', async function (err, filePathCpp) {
            if (err) {
                console.log(err.message + " go create failed");
                return;
            }
            console.log("Create Complete")
            console.log(filePathCpp);
            await build(filePathCpp, async function (err, filePathExe) {
                if (err) {
                    console.log(err.message + " go build failed");
                    return;
                }
                console.log(filePathExe);
                console.log("Build Complete");
                let runInput = testDummy.input.split('$.$');
                let runOutput = testDummy.output.split('$.$');
                var result_ = [];
                console.log(runInput);
                console.log(runOutput);
                const processXing = runInput.map(async (inputX, idx) => {
                    result_[idx] = await run(filePathExe, inputX);
                    console.log(inputX)
                    console.log(result_[idx].result);
                });

                await Promise.all(processXing);
                runOutput.forEach(runTest => {
                    if (runTest == result_[index].result) {
                        resultTest += 'P';
                    }
                    else resultTest += '-';

                    // console.log(ans2 +' '+runOutput[index]);
                    // if(ans2==runOutput[index]){
                    //     result+='P';
                    // }
                    // else result +='-';
                    index++;
                });


                // runInput.forEach((element,index,array)=>{
                //     let ans = run(filePathExe,(element,index,array));
                //     if(ans==runOutput[index]){
                //         result+='P';
                //     }
                // console.log(ans);
                // });
                console.log(resultTest);
            })
        })
    return;
}
(async () => {
    await go();
})();