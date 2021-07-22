const fs = require('fs');

module.exports = function checkForBannedLib(sourceCode) {
    //Read file libraryBanned.BAN
    const libBan = fs.readFileSync('./modules/bannedLibrary.BAN').toString().split(/\r?\n/);
    //console.log(libBan)
    //return [1, sourceCode];
    for (var lib of libBan) {
        if (sourceCode.toString().includes(lib)) {
            return [-1, `${lib} is a banned library`];
        }
    };
    let newSourceCode = '';
    try {
        if (sourceCode.lastIndexOf(`#include`) == -1) {
            return [1, `#include\"banned.h\"\r\n` + sourceCode];
        }
        // includeTable = sourceCode.toString().split(/\r?\n/);
        // for(var include of includeTable){
        //     if(include.toString().includes(`#include`)){
        //         //console.log(include)
        //         include+=`\r\n#include\"banned.h\"\r\n`
        //     }
        //     else{
        //         include+=`\r\n`
        //     }
        //     newSourceCode += include;
        // }
    let newString = sourceCode.substr(sourceCode.lastIndexOf(`#include`));
    let newString2 = newString.substr(newString.indexOf(`>`) + 1);

    newSourceCode=sourceCode.substr(0, sourceCode.indexOf(newString2)) + `\r\n#include\"banned.h\"\r\n` + newString2;
    //console.log(newSourceCode);
    return [1, newSourceCode];
    } catch (e) {
        console.log(e);
        return [1, `#include\"banned.h\"\r\n` + sourceCode];
   }
};