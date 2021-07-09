const fs = require('fs');

module.exports = function checkForBannedLib(sourceCode) {
    //Read file libraryBanned.BAN
    const libBan = fs.readFileSync('./modules/bannedLibrary.BAN').toString().split(/\r?\n/);
    //console.log(libBan)
    for (var lib of libBan) {
        //console.log(code.toString().includes(lib));
        if (sourceCode.toString().includes(lib)) {
            return [-1, `${lib} is a banned library`];
        }
    };
    //return [1, sourceCode];
    try {
        if (sourceCode.lastIndexOf(`#include`) == -1) {
            return [1, `#include\"banned.h\"\r\n` + sourceCode];
        }
        let headerString = sourceCode.substr(sourceCode.lastIndexOf(`#include`));
        let intmainString= headerString.substr(headerString.indexOf(`"\n`) + 1);
        if(intmainString == headerString){
            intmainString= headerString.substr(headerString.indexOf(`>`) + 1);
        }
        console.log(headerString)
        console.log('---------------');
        console.log(intmainString)
        console.log('---------------');
        
        let newSourceCode = sourceCode.substr(0,sourceCode.lastIndexOf(intmainString))+ `\r\n#include \"banned.h\" \r\n` + intmainString
        console.log(newSourceCode)
        return [1, newSourceCode];
    } catch (e) {
        console.log(e);
        return [1, `#include\"banned.h\"\r\n` + sourceCode];
    }
};