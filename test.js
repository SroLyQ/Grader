
const axios = require('axios')
const {
    checkResult
} = require('./run.js');
const checkForBannedLib = require('./checkBanLib')

code = `#include<stdio.h>
#include <math.h>
int main(){
printf("hello world\\n");
std::max(2,3);
int a=5,b=6;
#include <math.h>
return 0;
}`
async function tester() {
    console.log(await checkForBannedLib(code));
}
tester();