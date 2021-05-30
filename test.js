const {
    checkResult
} = require('./run.js');

var code1 = `#include <stdio.h> 
            int main(){
                char a;
                scanf(" %c",&a);
                printf("%c",a);
                return 0;
            }
    `
var testDummy1 = {
    input: `a$.$e$.$c$.$d$.$d$.$d$.$d$.$d$.$d$.$d`,
    output: `a$.$e$.$c$.$d$.$d$.$d$.$d$.$d$.$d$.$d`,
    sourceCode: code1
}

var code2 = `#include <stdio.h> 
            int main(){
                int n;
                scanf("%d",&n);
                for(int i=0;i<n;i++){
                    for(int j=0;j<n;j++){
                        printf("*");
                    }
                    printf("\\n");
                }
                return 0;
            }
    `
var testDummy2 = {
    input: `3$.$1$.$0$.$4`,
    output: `***\n***\n***\n$.$*\n$.$$.$****\n****\n****\n****\n`,
    sourceCode: code2
}

var code3 = `
#include <stdio.h> 
            int main(){
               int n;
               scanf("%d",&n);
               for(int i=0;i<n;i++){
                   if(i%2==0){
                       printf("1 ");
                   }
                   else{
                       printf("0 ");
                   }
                }
                return 0;
            }
`
var testDummy3 = {
    input: `6$.$2`,
    output: `1 0 1 0 1 0$.$1 0 `,
    sourceCode: code3
}
var code4 = `
#include <stdio.h> 
int main(){
    char a;
    scanf(" %c",&a);
    while(1);
    printf("%c",a);
    return 0;
}
`

var testDummy4 = {
    input: `6$.$2`,
    output: `6$.$2 `,
    sourceCode: code4
}
async function tester() {
    console.log(await checkResult(testDummy1));
    console.log(await checkResult(testDummy2));
    console.log(await checkResult(testDummy3));
    console.log(await checkResult(testDummy4));
}
tester();