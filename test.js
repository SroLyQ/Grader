const {
    go
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
    input: `a$.$e$.$c`,
    output: `a$.$e$.$c`,
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

async function tester(){
    console.log(await go(testDummy1));
    console.log(await go(testDummy2));
    console.log(await go(testDummy3));
}
tester();